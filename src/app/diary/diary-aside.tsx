import type { FC, HTMLAttributes } from 'react'

import { DeleteRowIcon } from '@icons'
import type { IDiary } from '@types'
import { Button } from '@ui'
import clsx from 'clsx'

interface DiaryAsideProps extends HTMLAttributes<HTMLElement> {
	diaries: IDiary[] | null
	selectedDiary: IDiary | null
	onSelectDiary: (diary: IDiary) => void
	onDelete: (diary: IDiary) => void
	onCreate: () => void
}

export const DiaryAside: FC<DiaryAsideProps> = ({
	diaries,
	selectedDiary,
	onSelectDiary,
	className,
	onDelete,
	onCreate,
	...props
}) => {
	const baseDiary = 'w-full flex justify-between items-stretch border-t-2 transition-colors'

	const diaryVariants = {
		default: 'border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800',
		active:
			'border-blue-600 dark:border-blue-500 bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200/50 dark:hover:bg-blue-800/50',
	}

	return (
		<aside
			className={clsx(
				'bg-white dark:bg-gray-900 shadow-sm rounded-xl py-4 flex flex-col gap-4 items-stretch justify-between',
				className,
			)}
			{...props}
		>
			<div>
				{/* title */}
				<h2 className='font-semibold mb-4 px-6'>Записи</h2>

				{/* list */}
				<ul className=''>
					{!diaries ? (
						<div className='mt-2 text-xs opacity-70'>
							Tip: entries are stored locally in your browser. Use export/import for backups (not implemented).
						</div>
					) : (
						diaries.map((d) => (
							<li
								key={d.id}
								className={clsx(baseDiary, diaryVariants[selectedDiary?.id === d.id ? 'active' : 'default'])}
							>
								<button
									className='text-left cursor-pointer pl-4 py-3 w-full text-base'
									onClick={() => onSelectDiary(d)}
								>
									<span>{d.title}</span>
								</button>

								<button
									className={`hover:text-red-500 transition-colors px-4 cursor-pointer ${selectedDiary?.id != d.id && 'hidden'}`}
									title='Удалить'
									onClick={() => onDelete(d)}
								>
									<DeleteRowIcon />
								</button>
							</li>
						))
					)}
				</ul>
			</div>

			{/* create new button */}
			<div className='px-6 max-md:mt-10'>
				<Button className='w-full' color='blue' size='sm' variant='solid' onClick={() => onCreate()}>
					Новая запись
				</Button>
			</div>
		</aside>
	)
}
