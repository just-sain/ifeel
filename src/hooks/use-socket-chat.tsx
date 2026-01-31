import { useEffect, useRef, useState } from 'react'

import type { ChatJoinMode, IMessage, IUseSocketChatReturn } from '@types'
import { ChatService } from 'services/chat-service'

export const useSocketChat = (): IUseSocketChatReturn & { connect: (mode: ChatJoinMode) => void } => {
	const [status, setStatus] = useState({ text: 'Disconnected', icon: '🔴' })
	const [messages, setMessages] = useState<IMessage[]>([])
	const [connected, setConnected] = useState(false)
	const [roomId, setRoomId] = useState('')

	const chatServiceRef = useRef<ChatService | null>(null)

	useEffect(() => {
		const service = new ChatService()

		service.setCallbacks(setMessages, setStatus, setConnected, setRoomId)
		chatServiceRef.current = service

		return () => {
			service.disconnect()
			chatServiceRef.current = null
		}
	}, [])

	return {
		status,
		messages,
		connected,
		roomId,
		connect: (mode) => chatServiceRef.current?.connect(mode),
		disconnect: () => chatServiceRef.current?.disconnect(),
		sendMessage: (content) => chatServiceRef.current?.sendMessage(content),
	}
}
