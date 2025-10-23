import { useEffect, useRef, useState } from 'react'

import type { IMessage, IUseSocketChatReturn } from '@types'
import { ChatService } from 'services/chat-service'

export const useSocketChat = (): IUseSocketChatReturn => {
	const [status, setStatus] = useState({ text: 'Disconnected', icon: '🔴' })
	const [messages, setMessages] = useState<IMessage[]>([])
	const [connected, setConnected] = useState(false)
	const [roomId, setRoomId] = useState('')

	const chatService = useRef<ChatService | null>(null)

	useEffect(() => {
		chatService.current = new ChatService()
		chatService.current.setCallbacks(setMessages, setStatus, setConnected, setRoomId)

		return () => {
			chatService.current?.disconnect()
		}
	}, [])

	const connect = () => {
		chatService.current?.connect()
	}

	const disconnect = () => {
		chatService.current?.disconnect()
	}

	const sendMessage = (content: string) => {
		chatService.current?.sendMessage(content)
	}

	return {
		status,
		messages,
		connected,
		roomId,
		connect,
		disconnect,
		sendMessage,
	}
}
