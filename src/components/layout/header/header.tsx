'use client'

import { useEffect, useState } from 'react'

import { useAuth } from '@hooks'
import { getTodaysMood } from '@services'
import type { IMood } from '@types'

import { HeaderAuth } from './header-auth'
import { HeaderLogo } from './header-logo'
import { HeaderMobileMenu } from './header-mobile-menu'
import { HeaderMobileNav } from './header-mobile-nav'
import { HeaderNav } from './header-nav'
import { HeaderThemeToggle } from './header-theme-toggle'

export const Header = () => {
	const { isLoading, user } = useAuth()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [todaysMood, setTodaysMood] = useState<IMood | null>(null)

	useEffect(() => {
		if (isLoading || !user) return

		getMood()
	}, [])

	const getMood = async () => {
		const data = await getTodaysMood()

		if (data) setTodaysMood(data.content[0])
	}

	return (
		<header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700'>
			<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<HeaderLogo />

					<HeaderNav />

					<div className='flex items-center gap-4'>
						<HeaderAuth todaysMood={todaysMood} />

						<HeaderThemeToggle />

						<HeaderMobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
					</div>
				</div>

				<HeaderMobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} todaysMood={todaysMood} />
			</nav>
		</header>
	)
}
