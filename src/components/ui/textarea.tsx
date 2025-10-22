import type { FC, TextareaHTMLAttributes } from 'react'

import clsx from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
}

export const Textarea: FC<TextareaProps> = ({ className, label, id, ...props }) => {
	return (
		<div className='w-full flex flex-col gap-1'>
			{label && (
				<label className='text-sm font-medium' htmlFor={id}>
					{label}
				</label>
			)}
			<textarea
				className={clsx(
					'w-full rounded-lg p-3 resize-vertical bg-white dark:bg-gray-700 border dark:border-gray-700 transition-all duration-300',
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
