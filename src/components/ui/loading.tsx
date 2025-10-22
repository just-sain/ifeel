import { type FC, useEffect, useState } from 'react'

import clsx from 'clsx'

interface LoadingProps {
	isLoading: boolean
}

export const Loading: FC<LoadingProps> = ({ isLoading }) => {
	const [isRendered, setIsRendered] = useState(isLoading)

	useEffect(() => {
		if (isLoading) {
			setIsRendered(true)
		} else {
			// corresponds to duration-300
			const timer = setTimeout(() => setIsRendered(false), 300)

			return () => clearTimeout(timer)
		}
	}, [isLoading])

	if (!isRendered) {
		return null
	}

	return (
		<div
			className={clsx(
				'fixed inset-0 z-50 flex items-center justify-center bg-gray-600/5 dark:bg-gray-500/5 backdrop-blur-sm transition-opacity duration-300',
				isLoading ? 'opacity-100' : 'opacity-0',
			)}
		>
			<div className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent' />
		</div>
	)
}
