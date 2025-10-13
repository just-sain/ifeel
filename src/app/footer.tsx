import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../components/icons'

const mockSocialMedia = [
	{ icon: TikTokIcon, href: '#', label: 'TikTok' },
	{ icon: YouTubeIcon, href: '#', label: 'YouTube' },
	{ icon: InstagramIcon, href: '#', label: 'Instagram' },
]

const mockAbout = [
	{ title: 'О компании', href: '#' },
	{ title: 'Наша команда', href: '#' },
	{ title: 'История', href: '#' },
]

const mockUseful = [
	{ title: 'Статьи', href: '#' },
	{ title: 'Советы', href: '#' },
	{ title: 'Ресурсы', href: '#' },
]

const mockOther = [
	{ title: 'FAQ', href: '#' },
	{ title: 'Поддержка', href: '#' },
	{ title: 'Политика конфиденциальности', href: '#' },
]

export const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-5 gap-8'>
					{/* Left side - Social Media Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Следите за нами</h3>
						<div className='flex space-x-4'>
							{mockSocialMedia.map((social) => (
								<a
									key={social.label}
									href={social.href}
									className='text-gray-400 hover:text-white transition-colors'
									aria-label={social.label}
								>
									<social.icon />
								</a>
							))}
						</div>
					</div>

					<div />

					{/* Center - Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>О нас</h3>
						<ul className='space-y-2'>
							{mockAbout.map((item) => (
								<li key={item.title}>
									<a href={item.href} className='text-gray-400 hover:text-white transition-colors'>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Полезное</h3>
						<ul className='space-y-2'>
							{mockUseful.map((item) => (
								<li key={item.title}>
									<a href={item.href} className='text-gray-400 hover:text-white transition-colors'>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Еще</h3>
						<ul className='space-y-2'>
							{mockOther.map((item) => (
								<li key={item.title}>
									<a href={item.href} className='text-gray-400 hover:text-white transition-colors'>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom - Contact Info */}
				<div className='border-t border-gray-800 mt-8 pt-8 text-center'>
					<div className='text-gray-400'>
						<p className='mb-2'>Email: info@psychologyhelp.com</p>
						<p>Телефон: +7 (123) 456-78-90</p>
					</div>
					<p className='text-gray-500 text-sm mt-4'>
						© {new Date().getFullYear()} <span className='underline'>Я чувствую</span>. Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}
