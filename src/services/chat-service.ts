import { Client } from '@stomp/stompjs'
import type { ChatJoinMode, IMessage } from '@types'
import SockJS from 'sockjs-client'

import { WS_URL, getAuthToken, parseJwt } from './token'

interface IChatEvent {
	type:
		| 'MESSAGE'
		| 'SYSTEM_MESSAGE'
		| 'JOIN'
		| 'LEAVE'
		| 'WAITING'
		| 'WAITING_FOR_PSYCHOLOGIST'
		| 'PSYCHOLOGIST_WAITING'
		| 'ALREADY_IN_ROOM'
		| 'CANCEL_WAITING'
		| 'MATCHED'
		| 'PEER_LEFT'
		| 'ROOM_EXPIRED'
		| 'ROOM_CLEARED'
		| 'ROOM_CLOSED'
		| 'SWITCH_CHAT'
		| 'TYPING'
		| 'DELIVERED'
	userId: string
	peerId: string | null
	roomId: string | null
	data: Record<string, unknown>
	timestamp: string
}

export class ChatService {
	private stompClient: Client | null = null
	private currentUser: string | null = null
	private messageIdCounter = 0
	private connected = false
	private roomId = ''
	private status = { text: 'Disconnected', icon: '🔴' }
	private messages: IMessage[] = []
	private pingInterval: ReturnType<typeof setInterval> | null = null

	private onMessage?: (messages: IMessage[]) => void
	private onStatusChange?: (status: { text: string; icon: string }) => void
	private onConnectedChange?: (connected: boolean) => void
	private onRoomIdChange?: (roomId: string) => void
	private onTyping?: (isTyping: boolean) => void

	setCallbacks(
		onMessage: (messages: IMessage[]) => void,
		onStatusChange: (status: { text: string; icon: string }) => void,
		onConnectedChange: (connected: boolean) => void,
		onRoomIdChange: (roomId: string) => void,
		onTyping?: (isTyping: boolean) => void,
	) {
		this.onMessage = onMessage
		this.onStatusChange = onStatusChange
		this.onConnectedChange = onConnectedChange
		this.onRoomIdChange = onRoomIdChange
		this.onTyping = onTyping
	}

	private logMessage(content: string, type: IMessage['type'] = 'system', senderId = 'system') {
		const message: IMessage = {
			id: this.messageIdCounter++,
			content,
			senderId,
			type,
		}

		this.messages.push(message)
		this.onMessage?.([...this.messages])
	}

	connect(mode: ChatJoinMode = 'anonymous') {
		if (this.connected) return

		const token = getAuthToken()

		if (!token) {
			this.logMessage('❌ No auth token available')

			return
		}

		const socket = new SockJS(`${WS_URL}/chat`)

		const client = new Client({
			webSocketFactory: () => socket,
			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 0,
			heartbeatOutgoing: 0,

			onConnect: () => {
				this.connected = true
				this.currentUser = (parseJwt(token) as { sub?: string })?.sub ?? 'unknown'

				this.status = {
					text: `Connected as ${this.currentUser}`,
					icon: '🟢',
				}

				this.onStatusChange?.(this.status)
				this.onConnectedChange?.(this.connected)

				this.startPing()

				// 🔔 match info
				client.subscribe('/user/queue/match', (msg) => {
					const event: IChatEvent = JSON.parse(msg.body)

					this.handleMatchEvent(event)
				})

				// 💬 messages
				client.subscribe('/user/queue/messages', (msg) => {
					const event: IChatEvent = JSON.parse(msg.body)

					this.handleMessageEvent(event)
				})

				// ⌨️ typing
				client.subscribe('/user/queue/typing', (msg) => {
					const event: IChatEvent = JSON.parse(msg.body)

					if (event.type === 'TYPING' && event.userId !== this.currentUser) {
						this.onTyping?.(true)
						setTimeout(() => this.onTyping?.(false), 3000)
					}
				})

				// 🚀 КЛЮЧЕВОЕ МЕСТО
				const destination = mode === 'psychologist' ? '/app/chat.join.psychologist' : '/app/chat.join'

				client.publish({
					destination,
					body: '{}',
				})
			},
			onDisconnect: () => {
				this.stopPing()
				this.connected = false
				this.onConnectedChange?.(false)
			},
		})

		client.activate()
		this.stompClient = client

		this.status = { text: 'Connecting...', icon: '🟡' }
		this.onStatusChange?.(this.status)
	}

	private handleMatchEvent(event: IChatEvent) {
		switch (event.type) {
			case 'MATCHED':
				if (event.roomId) {
					this.roomId = event.roomId
					this.onRoomIdChange?.(this.roomId)
				}

				const peerName = event.data?.peer || event.peerId || 'Unknown'

				this.logMessage(`Пользователь ${peerName} подключился. Начните общение!`, 'system')
				break

			case 'WAITING':
			case 'WAITING_FOR_PSYCHOLOGIST':
			case 'PSYCHOLOGIST_WAITING':
				this.logMessage('Вы подключены к чату. Ожидаем собеседника...', 'system')
				break

			case 'PEER_LEFT':
				this.logMessage('Собеседник покинул чат', 'system')
				this.disconnect()
				break

			case 'ROOM_CLOSED':
			case 'ROOM_EXPIRED':
			case 'ROOM_CLEARED':
				this.logMessage('Чат завершен.', 'system')
				this.disconnect()
				break

			case 'SWITCH_CHAT':
				this.logMessage('Ищем нового собеседника...', 'system')
				break
		}
	}

	private handleMessageEvent(event: IChatEvent) {
		if (event.type === 'MESSAGE' || event.type === 'SYSTEM_MESSAGE') {
			const content = event.data?.content || ''
			const senderId = event.userId || 'system'
			const type = senderId === 'SYSTEM' ? 'system' : senderId === this.currentUser ? 'self' : 'peer'

			this.logMessage(content, type, senderId)
		}
	}

	private startPing() {
		this.stopPing()
		this.pingInterval = setInterval(() => {
			if (this.connected && this.stompClient?.connected) {
				this.stompClient.publish({ destination: '/app/chat.ping' })
			}
		}, 30000)
	}

	private stopPing() {
		if (this.pingInterval) {
			clearInterval(this.pingInterval)
			this.pingInterval = null
		}
	}

	disconnect() {
		this.stopPing()
		if (!this.stompClient) return

		// Уведомляем бэкенд, чтобы он освободил собеседника
		if (this.connected && this.stompClient.connected) {
			this.stompClient.publish({
				destination: '/app/chat.leave',
				body: JSON.stringify({ roomId: this.roomId }),
			})
		}

		this.stompClient.deactivate()
		this.stompClient = null
		this.connected = false
		this.roomId = ''
		this.messages = [] // Очищаем историю
		this.status = { text: 'Disconnected', icon: '🔴' }

		this.onStatusChange?.(this.status)
		this.onConnectedChange?.(this.connected)
		this.onRoomIdChange?.(this.roomId)
		this.onMessage?.([])
	}

	switchChat() {
		if (!this.stompClient || !this.connected) return

		this.messages = [] // Чистим экран
		this.onMessage?.([])
		this.roomId = ''
		this.onRoomIdChange?.('')

		this.stompClient.publish({
			destination: '/app/chat.switch',
			body: '{}',
		})

		this.logMessage('Ищем нового собеседника...', 'system')
	}

	sendMessage(content: string) {
		if (!this.connected || !this.stompClient) {
			alert('Сначала подключись!')

			return
		}

		if (!this.roomId || !content.trim()) {
			alert('roomId не получен или сообщение пустое')

			return
		}

		const payload = {
			roomId: this.roomId,
			senderId: this.currentUser,
			content,
		}

		this.stompClient.publish({
			destination: '/app/chat.send',
			body: JSON.stringify(payload),
		})
	}

	sendTyping() {
		if (this.connected && this.stompClient && this.roomId) {
			this.stompClient.publish({
				destination: '/app/chat.typing',
				body: JSON.stringify({ roomId: this.roomId, senderId: this.currentUser }),
			})
		}
	}

	getStatus() {
		return this.status
	}

	getMessages() {
		return this.messages
	}

	getConnected() {
		return this.connected
	}

	getRoomId() {
		return this.roomId
	}
}
