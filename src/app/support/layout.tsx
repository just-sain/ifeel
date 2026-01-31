'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
	{ href: '/support/articles', label: '📚 Статьи' },
	{ href: '/support/techniques', label: '🧘 Техники' },
	{ href: '/support/video', label: '📽️ Видео техники' },
	{ href: '/support/contact', label: '💬 Связь' },
]

export default function SupportLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	return (
		<section className='space-y-6 max-w-7xl w-full mx-auto mt-10 my-20 px-4'>
			<h1 className='text-2xl font-semibold'>Психологическая поддержка</h1>

			<nav className='flex gap-2 border-b'>
				{tabs.map((tab) => {
					const isActive = pathname.includes(tab.href)

					return (
						<Link
							key={tab.href}
							className={[
								'px-4 py-2 text-sm transition-colors',
								isActive
									? 'border-b-2 border-primary font-medium'
									: 'text-muted-foreground hover:text-foreground',
							].join(' ')}
							href={tab.href}
						>
							{tab.label}
						</Link>
					)
				})}
			</nav>

			<div>{children}</div>
		</section>
	)
}
