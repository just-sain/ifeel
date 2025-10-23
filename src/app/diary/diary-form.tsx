import { type ChangeEvent, type FC, type FormEvent, type FormHTMLAttributes, useEffect, useState } from 'react'

import { normalizeDateIso } from '@helpers'
import type { IDiary } from '@types'
import { Button, Input, Textarea } from '@ui'

interface DiaryFormProps extends FormHTMLAttributes<HTMLFormElement> {
	handleSubmit: (diary: IDiary) => void
	diary: IDiary | null
	onDelete: (diary: IDiary | null) => void
}

export const DiaryForm: FC<DiaryFormProps> = ({
	className,
	handleSubmit,
	diary: selectedDiary,
	onDelete,
	...props
}) => {
	const [draftDiary, setDraftDiary] = useState<IDiary | null>(null)
	const [isEdited, setIsEdited] = useState<boolean | null>(false)

	// update selected diary to draft diary
	useEffect(() => {
		setDraftDiary(selectedDiary)
	}, [selectedDiary])

	// handle save
	const handleSave = (e: FormEvent) => {
		e.preventDefault()

		if (!draftDiary) return
		handleSubmit(draftDiary)
	}

	// handle on change
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'content' | 'title') => {
		const value = e.target.value
		let anyChanges = false

		// title check
		if (type == 'title' && selectedDiary?.title != null && value != selectedDiary?.title) {
			anyChanges = true
		}
		// content check
		if (type == 'content' && selectedDiary?.content != null && value != selectedDiary?.content) {
			anyChanges = true
		}

		setIsEdited(anyChanges)

		setDraftDiary((prev) => {
			if (!prev) return prev

			return {
				...prev,
				content: type == 'content' ? value : prev.content,
				title: type == 'title' ? value : prev.title,
			}
		})
	}

	return (
		<form
			className={`md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 max-sm:p-4 shadow-md flex flex-col gap-4 items-stretch	justify-between ${className}`}
			onSubmit={handleSave}
			{...props}
		>
			<div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 min-h-6 gap-3'>
				{!!draftDiary?.createdAt && <p>Создано: {normalizeDateIso(draftDiary?.createdAt)}</p>}
				{!!draftDiary?.updatedAt && draftDiary?.createdAt != draftDiary?.updatedAt && (
					<p>Обновлено: {normalizeDateIso(draftDiary?.updatedAt)}</p>
				)}
			</div>

			<Input
				className='dark:bg-gray-700 bg-white border-gray-900'
				disabled={!draftDiary}
				id='title'
				label='Заголовок'
				placeholder={!draftDiary ? 'Выберите запись' : 'Заголовок'}
				value={draftDiary?.title ?? ''}
				onChange={(e) => handleChange(e, 'title')}
			/>

			<Textarea
				className='h-full'
				disabled={!draftDiary}
				placeholder={
					!draftDiary ? 'Выберите запись' : 'Напишите свое мнение, мысли или короткую запись в дневнике...'
				}
				rows={14}
				value={draftDiary?.content ?? ''}
				onChange={(e) => handleChange(e, 'content')}
			/>

			<div className='flex items-center justify-between gap-3 max-md:flex-col max-md:items-stretch max-md:mt-8 max-md:gap-6 max-sm:px-0'>
				<div className='flex items-center gap-3 max-md:flex-col max-md:items-stretch max-md:gap-6'>
					<Button
						className='rounded px-4 py-2 bg-indigo-600 text-white hover:opacity-95'
						color='indigo'
						disabled={!draftDiary || (draftDiary != null && isEdited == false)}
						size='md'
						type='submit'
						onClick={handleSave}
					>
						Сохранить
					</Button>

					<Button
						className='rounded px-3 py-2 border'
						color='gray'
						disabled={!draftDiary || (draftDiary != null && isEdited == false)}
						size='md'
						type='button'
						onClick={() => setDraftDiary(selectedDiary)}
					>
						Сбросить
					</Button>
				</div>

				<div className='flex items-center gap-3 max-md:flex-col max-md:items-stretch max-md:gap-6'>
					<div className='ml-auto text-sm opacity-80 max-md:hidden'>
						Символов: {!draftDiary?.content ? 0 : draftDiary?.content.length}
					</div>

					<Button
						className='rounded px-3 py-2 border text-red-600 dark:text-red-300'
						color='red'
						disabled={!draftDiary || (draftDiary != null && draftDiary.id == 0)}
						size='md'
						type='button'
						variant='outline'
						onClick={() => onDelete(draftDiary)}
					>
						Удалить
					</Button>
				</div>
			</div>
		</form>
	)
}
