'use client'

import { usePathname } from 'next/navigation'

import { InstagramIcon, TikTokIcon, YouTubeIcon } from '@icons'

const mockSocialMedia = [
	{ icon: TikTokIcon, href: '#', label: 'TikTok' },
	{ icon: YouTubeIcon, href: '#', label: 'YouTube' },
	{ icon: InstagramIcon, href: '#', label: 'Instagram' },
]

const mockAbout = [
	{ title: 'Бадирова Аяжан', href: '#' },
	{ title: 'Алфёрова Анна', href: '#' },
]

const mockUseful = [
	{ title: 'Техники', href: '/support/techniques' },
	{ title: 'TED Talks', href: '/support/ted' },
	{ title: 'Книги', href: '/support/books' },
	{ title: 'Связаться', href: '/support/contact' },
]

export const Footer = () => {
	const pathname = usePathname()

	// Если текущий путь — /chat, возвращаем null (футер не отрендерится)
	if (pathname === '/chat') {
		return null
	}

	return (
		<footer className='bg-gray-900 text-white py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-5 gap-8'>
					{/* Содержимое футера */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Следите за нами</h3>
						<div className='flex space-x-4'>
							{mockSocialMedia.map((social) => (
								<a
									key={social.label}
									aria-label={social.label}
									className='text-gray-400 hover:text-white transition-colors'
									href={social.href}
								>
									<social.icon />
								</a>
							))}
						</div>
					</div>

					<div />

					<div>
						<h3 className='text-lg font-semibold mb-4'>Разработчики</h3>
						<ul className='space-y-2'>
							{mockAbout.map((item) => (
								<li key={item.title} className='text-gray-400'>
									{item.title}
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>О нас</h3>
						<ul className='space-y-2'>
							{mockUseful.map((item) => (
								<li key={item.title}>
									<a className='text-gray-400 hover:text-white transition-colors' href={item.href}>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* ... остальной код вашего футера ... */}
				</div>

				<div className='border-t border-gray-800 mt-8 pt-8 text-center'>
					<div className='text-gray-400'>
						<p>Телефон: +7 (747) 312 01 74 </p>
					</div>
					<p className='text-gray-500 text-sm mt-4'>
						© {new Date().getFullYear()} <span className='underline'>Я чувствую</span>. Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}
