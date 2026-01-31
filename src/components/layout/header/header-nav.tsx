import Link from 'next/link'

import { navLinks } from './data'

export const HeaderNav = () => {
	return (
		<div className='hidden md:block'>
			<div className='ml-10 flex space-x-1 items-center'>
				{navLinks.map((link) => (
					<Link
						key={link.name}
						className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-white dark:hover:text-blue-400'
						href={link.href}
					>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	)
}
