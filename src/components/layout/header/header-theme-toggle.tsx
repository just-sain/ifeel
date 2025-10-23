import { useTheme } from 'next-themes'

import { ThemeModeIcon } from '@icons'

export const HeaderThemeToggle = () => {
	const { setTheme, theme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme == 'dark' ? 'light' : 'dark')
	}

	return (
		<button
			aria-label='Toggle theme'
			className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-800 dark:text-gray-300'
			onClick={toggleTheme}
		>
			<ThemeModeIcon />
		</button>
	)
}
