'use client'

import { useEffect, useRef, useState } from 'react'

import { Message } from '@ui'
import { useSocketChat } from 'hooks/use-socket-chat'

type ChatState = 'landing' | 'searching' | 'chatting'

const ChatPage = () => {
	const { status, messages, connected, roomId, connect, sendMessage } = useSocketChat()

	const [messageText, setMessageText] = useState('')
	const [chatState, setChatState] = useState<ChatState>('landing')
	const [onlineUsers] = useState(42) // Mock online users count
	const logRef = useRef<HTMLDivElement>(null)

	const handleConnect = () => {
		setChatState('searching')
		connect()
	}

	const handleSendMessage = () => {
		sendMessage(messageText)
		setMessageText('')
	}

	const handleDisconnect = () => {
		setChatState('landing')
		connect() // This will disconnect since connected is true
	}

	// new messages
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight
		}
	}, [messages])

	// Update chat state based on connection status
	useEffect(() => {
		if (connected && roomId) {
			setChatState('chatting')
		} else if (!connected && chatState === 'chatting') {
			setChatState('landing')
		}
	}, [connected, roomId, chatState])

	if (chatState === 'landing') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
				<div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center'>
					<div className='mb-8'>
						<div className='w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
							<span className='text-3xl'>💬</span>
						</div>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Чат рулетка</h1>
						<p className='text-gray-600 dark:text-gray-400'>Найди собеседника и пообщайся</p>
					</div>

					<div className='mb-8'>
						<div className='inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium'>
							<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
							Онлайн: {onlineUsers} человек
						</div>
					</div>

					<button
						className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
						onClick={handleConnect}
					>
						🔗 Подключиться
					</button>

					<p className='text-xs text-gray-500 dark:text-gray-400 mt-4'>
						Нажимая "Подключиться", вы соглашаетесь с правилами чата
					</p>
				</div>
			</div>
		)
	}

	if (chatState === 'searching') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
				<div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center'>
					<div className='mb-8'>
						<div className='w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white' />
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Ищем собеседника...</h2>
						<p className='text-gray-600 dark:text-gray-400'>Пожалуйста, подождите</p>
					</div>

					<div className='mb-8'>
						<div className='flex justify-center space-x-2'>
							<div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce' />
							<div
								className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
								style={{ animationDelay: '0.1s' }}
							/>
							<div
								className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
								style={{ animationDelay: '0.2s' }}
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<div className='text-sm text-gray-600 dark:text-gray-400'>
							{status.icon} {status.text}
						</div>
						<button
							className='w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors'
							onClick={() => setChatState('landing')}
						>
							❌ Отмена
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0'>
				<div className='max-w-2xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center'>
							<span className='text-white text-sm'>💬</span>
						</div>
						<div>
							<h2 className='font-semibold text-gray-900 dark:text-white'>Чат рулетка</h2>
							<p className='text-sm text-gray-500 dark:text-gray-400'>Комната: {roomId}</p>
						</div>
					</div>
					<button
						className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors'
						onClick={handleDisconnect}
					>
						🔌 Выйти
					</button>
				</div>
			</div>

			{/* Chat Messages */}
			<div className='flex-1 overflow-hidden'>
				<div ref={logRef} className='h-full overflow-y-auto p-4 space-y-3 max-w-2xl mx-auto'>
					{messages.map((msg) => (
						<Message key={msg.id} {...msg} />
					))}
				</div>
			</div>

			{/* Message Input */}
			<div className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0 pb-30'>
				<div className='max-w-2xl mx-auto'>
					<div className='flex gap-3'>
						<textarea
							className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
							placeholder='Введите сообщение...'
							rows={1}
							value={messageText}
							onChange={(e) => setMessageText(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault()
									handleSendMessage()
								}
							}}
						/>
						<button
							className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={!messageText.trim()}
							onClick={handleSendMessage}
						>
							📨
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatPage
