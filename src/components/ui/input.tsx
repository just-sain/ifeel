import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	id: string
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
	return (
		<div className='mb-6'>
			<label className='mb-2 block font-medium text-gray-700 dark:text-gray-300' htmlFor={id}>
				{label}
			</label>
			<input className='box-border w-full rounded-md border border-gray-300 p-3' id={id} {...props} />
		</div>
	)
}
