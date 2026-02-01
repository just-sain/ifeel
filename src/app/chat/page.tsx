'use client'

import { useEffect, useRef, useState } from 'react'

import { whatsappNumber, whatsappText } from '@types'
import { Message } from '@ui'
import { useSocketChat } from 'hooks/use-socket-chat'
import { ArrowRight, MessageCircle } from 'lucide-react'

type ChatMode = 'landing' | 'anonymous' | 'psychologist' | 'roulette'
type ChatState = 'searching' | 'chatting'

const ChatPage = () => {
	const { messages, connected, roomId, isTyping, connect, disconnect, sendMessage, switchChat, sendTyping } =
		useSocketChat()

	const [chatMode, setChatMode] = useState<ChatMode>('landing')
	const [chatState, setChatState] = useState<ChatState>('searching')
	const [messageText, setMessageText] = useState('')

	const scrollRef = useRef<HTMLDivElement>(null)

	// 🌟 1. Логика авто-отключения при уходе/закрытии
	useEffect(() => {
		// Функция для обработки закрытия вкладки/браузера
		const handleBeforeUnload = () => {
			disconnect()
		}

		// Добавляем слушатель системного события закрытия окна
		window.addEventListener('beforeunload', handleBeforeUnload)

		// Cleanup функция: срабатывает при размонтировании компонента (переход на другую страницу SPA)
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
			disconnect()
		}
	}, [])

	useEffect(() => {
		// Если мы были в режиме чата, но roomId пропал или connected стал false
		if (chatMode !== 'landing' && !connected && chatState === 'chatting') {
			alert('Собеседник покинул чат или соединение разорвано.')
			setChatMode('landing')
			setChatState('searching')
		}
	}, [connected, chatMode, chatState])

	// 🌟 Подключение к чату
	const startChat = (mode: ChatMode) => {
		setChatMode(mode)
		setChatState('searching')

		if (mode === 'psychologist') connect('psychologist')
		else if (mode === 'anonymous') connect('anonymous')
		else if (mode === 'roulette') connect('roulette')
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

	// 📜 Автоскролл
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	// 🔄 Состояние чата
	useEffect(() => {
		if (connected && roomId) setChatState('chatting')
		else setChatState('searching')
	}, [connected, roomId])

	// Лэндинг
	if (chatMode === 'landing') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
				<div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Чат поддержки</h1>
					<p className='text-gray-600 dark:text-gray-400'>Выберите режим общения:</p>
					<div className='flex flex-col gap-4'>
						<button
							className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
							onClick={() => startChat('anonymous')}
						>
							💬 Анонимный чат с психологом
						</button>

						{/* WhatsApp */}
						<a
							className='group relative block p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-green-500/50 transition-all shadow-sm hover:shadow-md'
							href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
							rel='noopener noreferrer'
							target='_blank'
						>
							<div className='flex items-start gap-4'>
								<div className='p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-500'>
									<MessageCircle className='w-6 h-6' />
								</div>
								<div className='flex-1 space-y-1'>
									<h3 className='font-bold text-lg text-slate-900 dark:text-zinc-100'>WhatsApp</h3>
									<p className='text-sm text-muted-foreground leading-relaxed'>
										Прямая связь для записи на консультацию и уточнения расписания. Более личный формат.
									</p>
								</div>
								<ArrowRight className='w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all' />
							</div>
							<div className='mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-500/5 w-fit px-2 py-1 rounded-md'>
								<div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
								Психолог на связи
							</div>
						</a>
					</div>
				</div>
			</div>
		)
	}

	// 💬 Чат (ОСНОВНОЙ ИНТЕРФЕЙС)
	return (
		<div className='h-[100dvh] bg-gray-50 dark:bg-gray-950 relative overflow-hidden'>
			{/* Header - Fixed Top */}
			<header className='fixed top-16 left-0 right-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all'>
				<div className='max-w-4xl mx-auto px-4 py-3 flex items-center justify-between'>
					<div className='flex items-center gap-3 overflow-hidden'>
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
								chatMode === 'anonymous'
									? 'bg-green-100 text-green-600'
									: chatMode === 'psychologist'
										? 'bg-blue-100 text-blue-600'
										: 'bg-purple-100 text-purple-600'
							}`}
						>
							<span className='text-xl'>
								{chatMode === 'anonymous' ? '🎭' : chatMode === 'psychologist' ? '🧠' : '🎲'}
							</span>
						</div>
						<div className='min-w-0'>
							<h2 className='font-bold text-gray-900 dark:text-white truncate'>
								{chatMode === 'anonymous'
									? 'Анонимный чат с психологом'
									: chatMode === 'psychologist'
										? 'Психолог'
										: 'Чат рулетка'}
							</h2>
							<div className='flex items-center text-xs text-green-500'>
								<span className='w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse' />
								{chatState === 'searching' ? 'Поиск...' : isTyping ? 'печатает...' : 'Собеседник в сети'}
							</div>
						</div>
					</div>
					<div className='flex items-center gap-1'>
						{chatState === 'chatting' && (
							<button
								className='p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors'
								title='Следующий собеседник'
								onClick={switchChat}
							>
								<svg
									fill='none'
									height='24'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									viewBox='0 0 24 24'
									width='24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<polygon points='5 4 15 12 5 20 5 4' />
									<line x1='19' x2='19' y1='5' y2='19' />
								</svg>
							</button>
						)}
						<button
							className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'
							title='Завершить чат'
							onClick={handleDisconnect}
						>
							<svg
								fill='none'
								height='24'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								width='24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M18.36 6.64a9 9 0 1 1-12.73 0' />
								<line x1='12' x2='12' y1='2' y2='12' />
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Messages Area */}
			<main className='h-full w-full overflow-y-auto scroll-smooth'>
				<div className='max-w-3xl mx-auto p-4 space-y-4 pt-20 pb-32 min-h-full flex flex-col justify-end'>
					{messages.length === 0 && (
						<div className='text-center text-gray-400 py-10 text-sm'>Начните общение...</div>
					)}

					{messages.map((msg) => (
						<Message key={msg.id} {...msg} senderId={chatMode !== 'anonymous' ? msg.senderId : ''} />
					))}

					<div ref={scrollRef} className='h-px' />
				</div>
			</main>

			{/* Input Area - Fixed Bottom */}
			<footer className='fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)]'>
				<div className='max-w-3xl mx-auto p-3'>
					<div className='relative flex items-end gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-3xl border border-transparent focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm'>
						<textarea
							className='flex-1 max-h-32 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 px-4 py-3 focus:outline-none resize-none overflow-y-auto text-base'
							disabled={chatState !== 'chatting'}
							placeholder='Напишите сообщение...'
							rows={1}
							value={messageText}
							onChange={(e) => {
								setMessageText(e.target.value)
								sendTyping()
								e.target.style.height = 'auto'
								e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault()
									handleSendMessage()
									const target = e.target as HTMLTextAreaElement

									target.style.height = 'auto'
								}
							}}
						/>

						<button
							className={`mb-1 p-3 rounded-full transition-all flex items-center justify-center flex-shrink-0 ${
								!messageText.trim() || chatState !== 'chatting'
									? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
									: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
							}`}
							disabled={!messageText.trim() || chatState !== 'chatting'}
							onClick={handleSendMessage}
						>
							<svg
								fill='none'
								height='20'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								width='20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<line x1='22' x2='11' y1='2' y2='13' />
								<polygon points='22 2 15 22 11 13 2 9 22 2' />
							</svg>
						</button>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default ChatPage
