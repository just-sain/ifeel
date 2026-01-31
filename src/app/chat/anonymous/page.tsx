'use client'

import { useEffect, useRef, useState } from 'react'

import { Message } from '@ui'
import { useSocketChat } from 'hooks/use-socket-chat'

type ChatMode = 'landing' | 'anonymous' | 'psychologist'
type ChatState = 'searching' | 'chatting'

const AnonymousChatPage = () => {
	const { status, messages, connected, roomId, connect, disconnect, sendMessage } = useSocketChat()

	const [chatMode, setChatMode] = useState<ChatMode>('landing')
	const [chatState, setChatState] = useState<ChatState>('searching')
	const [messageText, setMessageText] = useState('')
	const logRef = useRef<HTMLDivElement>(null)

	// start
	const startChat = (mode: ChatMode) => {
		setChatMode(mode)
		setChatState('searching')

		if (mode === 'psychologist') {
			connect('psychologist')
		} else {
			connect('anonymous')
		}
	}

	const handleSendMessage = () => {
		if (!messageText.trim()) return
		sendMessage(messageText)
		setMessageText('')
	}

	const handleDisconnect = () => {
		disconnect()
		setChatMode('landing')
		setChatState('searching')
	}

	// 📜 автоскролл
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight
		}
	}, [messages])

	// 🔄 состояние чата
	useEffect(() => {
		if (connected && roomId) {
			setChatState('chatting')
		} else {
			setChatState('searching')
		}
	}, [connected, roomId])

	// 🧭 Лэндинг
	if (chatMode === 'landing') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
				<div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Чат поддержки</h1>
					<p className='text-gray-600 dark:text-gray-400'>Выберите режим общения:</p>

					<div className='flex flex-col gap-4'>
						<button
							className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all'
							onClick={() => startChat('anonymous')}
						>
							💬 Анонимный чат
						</button>

						<button
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all'
							onClick={() => startChat('psychologist')}
						>
							🧠 Связь с психологом
						</button>
					</div>
				</div>
			</div>
		)
	}

	// 💬 Чат
	return (
		<div className='h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 border-b p-4 flex-shrink-0'>
				<div className='max-w-2xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center'>
							<span className='text-white'>💬</span>
						</div>
						<div>
							<h2 className='font-semibold text-gray-900 dark:text-white'>
								{chatMode === 'anonymous' ? 'Анонимный чат' : 'Чат с психологом'}
							</h2>
							<p className='text-sm text-gray-500'>
								{chatState === 'searching' ? 'Поиск собеседника...' : `Комната: ${roomId}`}
							</p>
						</div>
					</div>

					<button
						className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
						onClick={handleDisconnect}
					>
						🔌 Выйти
					</button>
				</div>
			</div>

			{/* Messages */}
			<div className='flex-1 overflow-hidden'>
				<div ref={logRef} className='h-full overflow-y-auto p-4 space-y-3 max-w-2xl mx-auto'>
					{messages.map((msg) => (
						<Message key={msg.id} {...msg} senderId={chatMode != 'anonymous' ? msg.senderId : ''} />
					))}
				</div>
			</div>

			{/* Input */}
			<div className='bg-white dark:bg-gray-800 border-t p-4 flex-shrink-0 fixed bottom-0 w-full py-10'>
				<div className='max-w-2xl mx-auto flex gap-3'>
					<textarea
						className='flex-1 px-4 py-3 border rounded-xl resize-none'
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
						disabled={chatState !== 'chatting'}
					/>
					<button
						className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50'
						disabled={!messageText.trim() || chatState !== 'chatting'}
						onClick={handleSendMessage}
					>
						📨
					</button>
				</div>
			</div>
		</div>
	)
}

export default AnonymousChatPage
