import Link from 'next/link'

import { useAuth } from '@hooks'
import type { IMood } from '@types'
import { Button } from '@ui'

const navLinks = [
	{ name: 'Бесплатная консультация', href: 'https://wa.link/vs0qne' },
	{ name: 'Чат рулетка', href: '/chat' },
	{ name: 'Анкета вопросов', href: '/test' },
	{ name: 'Блокнот', href: '/diary' },
]

interface HeaderMobileNavProps {
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
	todaysMood: IMood | null
}

export const HeaderMobileNav = ({ isMenuOpen, setIsMenuOpen, todaysMood }: HeaderMobileNavProps) => {
	const { isLoading, user, logout } = useAuth()

	return (
		<>
			{isMenuOpen && (
				<div className='md:hidden'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'
								href={link.href}
								onClick={() => setIsMenuOpen(false)}
							>
								{link.name}
							</Link>
						))}

						{/* Mobile Auth Links */}
						{!isLoading && !user && (
							<>
								<Link
									className='text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-white dark:hover:text-blue-400'
									href='/login'
									onClick={() => setIsMenuOpen(false)}
								>
									Войти
								</Link>
								<Link
									className='bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors'
									href='/register'
									onClick={() => setIsMenuOpen(false)}
								>
									Зарегистрироваться
								</Link>
							</>
						)}
						{!isLoading && !!user && (
							<div className='px-3 py-2'>
								<p className='text-gray-900 dark:text-white italic mb-2'>{user.fullName}</p>
								{!!todaysMood && <p className='text-gray-600 dark:text-gray-400 mb-2'>{todaysMood.label}</p>}
								<Button
									className='w-full'
									color='indigo'
									size='sm'
									variant='outline'
									onClick={() => {
										logout()
										setIsMenuOpen(false)
									}}
								>
									Выйти
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
