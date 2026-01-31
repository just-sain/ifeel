import { Client } from '@stomp/stompjs'
import type { ChatJoinMode, IMessage } from '@types'
import SockJS from 'sockjs-client'

import { WS_URL, getAuthToken, parseJwt } from './token'

export class ChatService {
	private stompClient: Client | null = null
	private currentUser: string | null = null
	private messageIdCounter = 0
	private connected = false
	private roomId = ''
	private status = { text: 'Disconnected', icon: '🔴' }
	private messages: IMessage[] = []

	private onMessage?: (messages: IMessage[]) => void
	private onStatusChange?: (status: { text: string; icon: string }) => void
	private onConnectedChange?: (connected: boolean) => void
	private onRoomIdChange?: (roomId: string) => void

	setCallbacks(
		onMessage: (messages: IMessage[]) => void,
		onStatusChange: (status: { text: string; icon: string }) => void,
		onConnectedChange: (connected: boolean) => void,
		onRoomIdChange: (roomId: string) => void,
	) {
		this.onMessage = onMessage
		this.onStatusChange = onStatusChange
		this.onConnectedChange = onConnectedChange
		this.onRoomIdChange = onRoomIdChange
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

			onConnect: () => {
				this.connected = true
				this.currentUser = (parseJwt(token) as { sub?: string })?.sub ?? 'unknown'

				this.status = {
					text: `Connected as ${this.currentUser}`,
					icon: '🟢',
				}

				this.onStatusChange?.(this.status)
				this.onConnectedChange?.(this.connected)

				// 🔔 match info
				client.subscribe('/user/queue/match', (msg) => {
					const data = JSON.parse(msg.body)

					if (data.status == 'peer_left') {
						this.logMessage('Собеседник покинул чат', 'system')
						// Важно: вызываем дисконнект локально, чтобы сбросить состояния
						this.disconnect()

						return
					}

					if (data.room) {
						this.roomId = data.room
						this.onRoomIdChange?.(this.roomId)
					}

					if (data.peer) {
						this.logMessage(`Пользователь ${data.peer} подключился. Начните общение!`, 'system')
					} else {
						this.logMessage('Вы подключены к чату. Ожидаем собеседника...', 'system')
					}
				})

				// 💬 сообщения
				client.subscribe('/user/queue/messages', (msg) => {
					const data = JSON.parse(msg.body)
					const type = data.senderId === this.currentUser ? 'self' : 'peer'

					this.logMessage(data.content, type, data.senderId)
				})

				// 🚀 КЛЮЧЕВОЕ МЕСТО
				const destination = mode === 'psychologist' ? '/app/chat.join.psychologist' : '/app/chat.join'

				client.publish({
					destination,
					body: '{}',
				})
			},
		})

		client.activate()
		this.stompClient = client

		this.status = { text: 'Connecting...', icon: '🟡' }
		this.onStatusChange?.(this.status)
	}

	disconnect() {
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
