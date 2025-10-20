import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
	const baseClasses =
		'cursor-pointer rounded-md border-none bg-indigo-600 py-3 px-6 text-base font-semibold text-white transition-colors hover:bg-indigo-700'

	const combinedClasses = [baseClasses, className].filter(Boolean).join(' ')

	return (
		<button className={combinedClasses} {...props}>
			{children}
		</button>
	)
}
