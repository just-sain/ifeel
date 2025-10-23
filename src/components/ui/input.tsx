import { type InputHTMLAttributes } from 'react'

import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	id: string
	error?: string
}

export const Input: React.FC<InputProps> = ({ label, id, className, error, ...props }) => {
	return (
		<div className='mb-6'>
			<label className='mb-2 block font-medium text-gray-700 dark:text-gray-300' htmlFor={id}>
				{label}
			</label>
			<input
				className={clsx(
					'box-border w-full rounded-md border p-3 transition-all duration-300',
					{
						'border-red-500 dark:border-red-500': error,
						'border-gray-300 dark:border-gray-700': !error,
						'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-800': props.disabled,
					},
					className,
				)}
				id={id}
				{...props}
			/>
			{error && <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>}
		</div>
	)
}
