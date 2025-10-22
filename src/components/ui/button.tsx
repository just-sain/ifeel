import React from 'react'

import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	color?: 'blue' | 'red' | 'white' | 'gray' | 'indigo'
	variant?: 'solid' | 'outline'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className,
	size = 'md',
	color = 'indigo',
	variant = 'solid',
	...props
}) => {
	const baseClasses =
		'cursor-pointer rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border'

	const sizeClasses = {
		xs: 'py-1 px-2 text-xs',
		sm: 'py-2 px-4 text-sm',
		md: 'py-3 px-6 text-base',
		lg: 'py-3 px-8 text-lg',
		xl: 'py-4 px-10 text-xl',
	}

	const variantClasses = {
		solid: {
			indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent',
			blue: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
			red: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
			white: 'bg-white text-gray-900 hover:bg-gray-100 border-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600',
			gray: 'bg-gray-600 text-white hover:bg-gray-700 border-transparent',
		},
		outline: {
			indigo:
				'bg-indigo-600/0 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-white',
			blue: 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-white',
			red: 'bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-400 dark:hover:text-white',
			white: 'bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700',
			gray: 'bg-gray-600/0 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white dark:text-gray-400 dark:border-gray-400 dark:hover:bg-gray-400 dark:hover:text-white',
		},
	}

	return (
		<button className={clsx(baseClasses, sizeClasses[size], variantClasses[variant][color], className)} {...props}>
			{children}
		</button>
	)
}
