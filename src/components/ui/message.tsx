import type { FC, HTMLAttributes } from 'react'

import type { IMessage, MessageSenderType } from '@types'
import clsx from 'clsx'

interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content' | 'id'>, IMessage {
	className?: string
}

export const Message: FC<MessageProps> = ({ id, type, senderId, content, className, ...props }) => {
	const baseMsgClasses = 'p-2 rounded-lg text-wrap break-words'
	const msgTypeClasses: Record<MessageSenderType, string> = {
		system: 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 italic',
		self: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-8',
		other: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 mr-8',
		peer: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 mr-8',
	}
	const senderBaseClasses = 'w-full mb-0.5'
	const senderTypeClasses: Record<MessageSenderType, string> = {
		system: 'text-gray-500 dark:text-gray-400 text-center',
		self: 'text-gray-500 dark:text-gray-400 text-right',
		other: 'text-red-600 mr-8 text-left',
		peer: 'text-green-600 dark:text-green-400 mr-8 text-left',
	}

	return (
		<div key={id} className={className} {...props}>
			<p className={clsx(senderBaseClasses, senderTypeClasses[type])}>{senderId}</p>
			<p className={clsx(baseMsgClasses, msgTypeClasses[type])}>{content}</p>
		</div>
	)
}
