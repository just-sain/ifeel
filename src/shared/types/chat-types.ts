export type MessageSenderType = 'system' | 'self' | 'other' | 'peer'

export interface IMessage {
	id: number
	content: string
	senderId: string
	type: MessageSenderType
}

export interface IUseSocketChatReturn {
	status: { text: string; icon: string }
	messages: IMessage[]
	connected: boolean
	roomId: string
	connect: () => void
	disconnect: () => void
	sendMessage: (content: string) => void
}

export interface IUserQueueMath {
	peer: string
	room: string
	status: 'already_in_room'
}
