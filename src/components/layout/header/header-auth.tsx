import Link from 'next/link'

import { useAuth } from '@hooks'
import type { IMood } from '@types'
import { Button } from '@ui'

interface HeaderAuthProps {
	todaysMood: IMood | null
}

export const HeaderAuth = ({ todaysMood }: HeaderAuthProps) => {
	const { isLoading, user, logout } = useAuth()

	return (
		<div className='hidden md:flex items-center gap-4'>
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
	)
}
