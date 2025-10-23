'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

const quotes = [
	{
		text: 'Самопознание - это путешествие, которое длится всю жизнь. Каждый шаг на этом пути делает нас сильнее и мудрее.',
		author: 'Карл Юнг',
		role: 'Психоаналитик',
	},
	{
		text: 'Эмоции - это язык души. Научитесь слушать себя, и вы услышите ответы на все вопросы.',
		author: 'Виктор Франкл',
		role: 'Психолог',
	},
	{
		text: 'Ваше прошлое не определяет ваше будущее. Каждый день - это возможность начать заново.',
		author: 'Абрахам Маслоу',
		role: 'Психолог',
	},
	{
		text: 'Счастье - это не отсутствие проблем, а умение с ними справляться.',
		author: 'Эрих Фромм',
		role: 'Психоаналитик',
	},
]

export const HeroSection = () => {
	const [activeQuoteIndex, setActiveQuoteIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [quotes.length])

	return (
		<section className='pt-16 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden' id='home'>
			{/* Background Image */}
			<div className='absolute inset-0 z-0'>
				<div className='w-full h-full bg-[url("/hero.jpg")] bg-cover bg-center bg-no-repeat opacity-100' />
				<div className='absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-100/60 dark:from-gray-900/80 dark:to-gray-800/80' />
			</div>

			<div className='max-w-7xl mx-auto w-full relative z-10'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Left side - Consultation */}
					<div className='animate-slide-in-left'>
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
							Консультация с<span className='block text-blue-600 dark:text-blue-400'>психологом</span>
						</h1>
						<p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8'>
							Получите профессиональную помощь и поддержку в решении ваших психологических вопросов. Наши опытные
							специалисты помогут вам найти путь к гармонии и благополучию.
						</p>
						<div className='flex flex-col sm:flex-row gap-4'>
							<Link
								className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
								href='https://wa.link/vs0qne'
							>
								Записаться на консультацию
							</Link>
							<Link
								className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center'
								href='#about'
							>
								Узнать больше
							</Link>
						</div>
					</div>

					{/* Right side - Rotating Quotes */}
					<div className='animate-slide-in-right'>
						<div className='relative bg-white/40 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 min-h-[400px] border border-white/20'>
							<div className='rotating-quotes'>
								{quotes.map((quote, index) => (
									<div key={index} className={`quote-item ${index === activeQuoteIndex ? 'active' : ''}`}>
										<div className='text-6xl text-blue-600 dark:text-blue-400 mb-4'>"</div>
										<p className='text-lg text-gray-700 dark:text-gray-300 mb-6 italic'>"{quote.text}"</p>
										<div className='text-right'>
											<p className='font-semibold text-gray-900 dark:text-white'>{quote.author}</p>
											<p className='text-sm text-gray-600 dark:text-gray-400'>{quote.role}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
