import React from 'react'

import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	id: string
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
	return (
		<div className='mb-6'>
			<label className='mb-2 block font-medium text-gray-700 dark:text-gray-300' htmlFor={id}>
				{label}
			</label>
			<input
				className={clsx(
					'box-border w-full rounded-md border border-gray-300 p-3 dark:border-gray-700 transition-all duration-300',
					{
						'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-800': props.disabled,
					},
					className,
				)}
				id={id}
				{...props}
			/>
		</div>
	)
}
