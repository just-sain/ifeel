'use client'

import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import Link from 'next/link'

import { Button } from '@components/ui'
import { useAuth } from '@hooks'
import { CloudSmileyIcon, ThemeModeIcon } from '@icons'
import { getTodaysMood } from '@services'
import type { IMood } from '@shared/types'

export const Header = () => {
	const { setTheme, theme } = useTheme()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [todaysMood, setTodaysMood] = useState<IMood | null>(null)

	const { isLoading, user, logout } = useAuth()

	const toggleTheme = () => {
		setTheme(theme == 'dark' ? 'light' : 'dark')
	}

	useEffect(() => {
		if (isLoading || !user) return

		getMood()
	}, [isLoading])

	const getMood = async () => {
		const data = await getTodaysMood()

		if (data) setTodaysMood(data.content[0])
	}

	return (
		<header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700'>
			<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link className='flex-shrink-0 flex items-center space-x-2 cursor-pointer' href='/'>
						<div className='relative'>
							<CloudSmileyIcon />

							<svg
								className='absolute -top-2 -right-2 w-4 h-4 text-yellow-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
								/>
							</svg>
						</div>
						<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Я чувствую</h1>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:block'>
						<div className='ml-10 flex space-x-1 items-center'>
							<button className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Созвонится с психологом
							</button>
							<button className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Чат рулетка
							</button>
							<button className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Анкета вопросов
							</button>
							<Link
								className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'
								href='/diary'
							>
								Блокнот
							</Link>
						</div>
					</div>

					{/* Login/Register and Theme toggle */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-4 max-xl:hidden'>
							{!isLoading && !user && (
								<>
									<Link
										className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'
										href='/login'
									>
										Войти
									</Link>

									<Link
										className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
										href='register'
									>
										Зарегистрироваться
									</Link>
								</>
							)}
							{!isLoading && !!user && <p className='italic'>{user.fullName}</p>}
							{!isLoading && !!user && !!todaysMood && <p>{todaysMood.label}</p>}
							{!isLoading && !!user && (
								<Button className='' color='indigo' size='sm' variant='outline' onClick={() => logout()}>
									Выйти
								</Button>
							)}
						</div>

						<button
							aria-label='Toggle theme'
							className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-800 dark:text-gray-300'
							onClick={toggleTheme}
						>
							<ThemeModeIcon />
						</button>

						{/* Mobile menu button */}
						<div className='md:hidden'>
							<button
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-800'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<svg
									className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M4 6h16M4 12h16M4 18h16'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
									/>
								</svg>
								<svg
									className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M6 18L18 6M6 6l12 12'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'>
							<button className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Созвонится с психологом
							</button>
							<button className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Чат рулетка
							</button>
							<button className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Анкета вопросов
							</button>
							<Link
								className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'
								href='/diary'
							>
								Блокнот
							</Link>
							<button className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'>
								Эмоции
							</button>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}
