import { Client } from '@stomp/stompjs'
import type { IMessage, IUserQueueMath } from '@types'
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
		const message = {
			id: this.messageIdCounter++,
			content,
			senderId,
			type,
		}

		this.messages.push(message)
		this.onMessage?.([...this.messages])
	}

	connect() {
		if (this.connected) {
			this.disconnect()

			return
		}

		const token = getAuthToken()

		if (!token) {
			this.logMessage('❌ No auth token available')

			return
		}

		const socket = new SockJS(`${WS_URL}/chat`)

		const client = new Client({
			webSocketFactory: () => socket,
			connectHeaders: { Authorization: 'Bearer ' + token },
			reconnectDelay: 5000,
			onConnect: () => {
				this.connected = true
				this.currentUser = (parseJwt(token) as { sub?: string }).sub || 'unknown'

				this.status = { text: `Connected as ${this.currentUser}`, icon: '🟢' }
				this.onStatusChange?.(this.status)
				this.onConnectedChange?.(this.connected)

				client.subscribe('/user/queue/match', (msg) => {
					const data: IUserQueueMath = JSON.parse(msg.body)

					if (data.room) {
						this.roomId = data.room
						this.onRoomIdChange?.(this.roomId)
					}

					if (data.peer) {
						this.logMessage(`Пользователь ${data.peer} подключился. Начните общение!`, 'system')
					} else if (data.room) {
						this.logMessage('Вы подключены к чату. Ожидаем собеседника...', 'system')
					}
				})

				client.subscribe('/user/queue/messages', (msg) => {
					const data = JSON.parse(msg.body)

					const type = data.senderId === this.currentUser ? 'self' : 'peer'

					this.logMessage(data.content, type, data.senderId)
				})

				client.publish({ destination: '/app/chat.join', body: '{}' })
			},
			onStompError: (frame) => {
				this.logMessage('❌ STOMP error: ' + frame.headers['message'], 'system')
				this.connected = false
				this.status = { text: 'Connection error', icon: '🔴' }
				this.onStatusChange?.(this.status)
				this.onConnectedChange?.(this.connected)
			},
		})

		client.activate()
		this.stompClient = client

		this.status = { text: 'Connecting...', icon: '🟡' }
		this.onStatusChange?.(this.status)
	}

	disconnect() {
		if (this.stompClient) {
			this.stompClient.deactivate()
			this.status = { text: 'Disconnected', icon: '🔴' }
			this.onStatusChange?.(this.status)
			this.logMessage('🔌 Disconnected', 'system')
			this.connected = false
			this.onConnectedChange?.(this.connected)
		}
	}
	sendMessage(content: string) {
		if (!this.connected) {
			alert('Сначала подключись!')

			return
		}
		if (!this.roomId.trim() || !content.trim()) {
			alert('Введите сообщение (и roomId должен быть получен)')

			return
		}
		const payload = { roomId: this.roomId, senderId: this.currentUser, content }

		this.stompClient?.publish({ destination: '/app/chat.send', body: JSON.stringify(payload) })
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
