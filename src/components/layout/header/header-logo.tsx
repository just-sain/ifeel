import Link from 'next/link'

import { CloudSmileyIcon } from '@icons'

export const HeaderLogo = () => {
	return (
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
	)
}
