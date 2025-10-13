'use client'

import { useEffect, useState } from 'react'

import { BookIcon, ChartIcon, ChatIcon, GroupIcon, HeartIcon, WarningIcon } from './icons'

const mockNews = [
	{
		image: 'url(https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
		icon: BookIcon,
		color: 'bg-blue-600',
		title: 'Новые методы терапии',
		description:
			'Представляем инновационные подходы в психологической терапии, которые помогают достичь лучших результатов.',
		linkColor: 'text-blue-600 dark:text-blue-400',
	},
	{
		image: 'url(https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
		icon: ChatIcon,
		color: 'bg-green-600',
		title: 'Онлайн консультации',
		description: 'Теперь вы можете получить профессиональную психологическую помощь не выходя из дома.',
		linkColor: 'text-green-600 dark:text-green-400',
	},
	{
		image: 'url(https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
		icon: GroupIcon,
		color: 'bg-purple-600',
		title: 'Групповые сессии',
		description: 'Присоединяйтесь к групповым терапевтическим сессиям для взаимной поддержки и роста.',
		linkColor: 'text-purple-600 dark:text-purple-400',
	},
]

const mockPsychologyHelp = [
	{
		icon: WarningIcon,
		color: 'bg-red-500',
		title: 'Тревога и стресс',
		description: 'Преодоление тревожных состояний и управление стрессом',
	},
	{
		icon: HeartIcon,
		color: 'bg-blue-500',
		title: 'Отношения и любовь',
		description: 'Помощь в построении здоровых отношений',
	},
	{
		icon: ChatIcon,
		color: 'bg-green-500',
		title: 'Самопознание',
		description: 'Поиск смысла жизни и самореализация',
	},
	{
		icon: BookIcon,
		color: 'bg-purple-500',
		title: 'Депрессия',
		description: 'Преодоление депрессивных состояний',
	},
	{
		icon: GroupIcon,
		color: 'bg-orange-500',
		title: 'Семейные проблемы',
		description: 'Решение конфликтов в семье',
	},
	{
		icon: ChartIcon,
		color: 'bg-teal-500',
		title: 'Личностный рост',
		description: 'Развитие потенциала и достижение целей',
	},
]

export const AboutSection = () => {
	const [currentQuote, setCurrentQuote] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentQuote((prev) => (prev + 1) % 3)
		}, 8000)

		return () => clearInterval(interval)
	}, [])

	return (
		<section className='py-20 bg-white dark:bg-gray-800' id='about'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16 animate-fade-in-up'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>О нас</h2>
					<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Профессиональная психологическая помощь для вашего благополучия и гармонии.
					</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Left side - News Carousel */}
					<div className='animate-slide-in-left'>
						<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Новости</h3>
						<div className='relative pt-6'>
							<div className='news-carousel'>
								{mockNews.map((news, index) => (
									<div
										key={index}
										className={`news-item ${currentQuote % mockNews.length === index ? 'active' : ''}`}
									>
										<div className='mb-4'>
											<img
												src={news.image.replace('url(', '').replace(')', '')}
												alt={news.title}
												className='w-full h-52 object-cover rounded-lg'
											/>
										</div>
										<div className='flex items-start space-x-4'>
											<div
												className={`w-12 ${news.color} rounded-lg flex items-center justify-center flex-shrink-0`}
											>
												<news.icon />
											</div>
											<div>
												<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
													{news.title}
												</h4>
												<p className='text-gray-600 dark:text-gray-300 mb-3'>{news.description}</p>
												<span className={`text-sm ${news.linkColor} font-medium`}>Читать далее →</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right side - Psychology Help Cards */}
					<div className='animate-slide-in-right'>
						<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>С чем поможет психолог</h3>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{mockPsychologyHelp.map((help, index) => (
								<div
									key={index}
									className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in-up'
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className='flex flex-col items-center text-center space-y-3'>
										<div className={`w-12 h-12 ${help.color} rounded-lg flex items-center justify-center`}>
											<help.icon />
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 dark:text-white'>{help.title}</h4>
											<p className='text-sm text-gray-600 dark:text-gray-300'>{help.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
