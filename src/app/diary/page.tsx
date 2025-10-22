'use client'

import { type FC, useEffect, useState } from 'react'

import { withAuth } from '@hoc'
import { createDiary, deleteDiary, getDiaries, updateDiary } from '@services'
import type { IDiary } from '@types'
import { Loading } from '@ui'

import { DiaryAside } from './diary-aside'
import { DiaryForm } from './diary-form'

const DiaryPage: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [diaries, setDiaries] = useState<IDiary[] | null>(null)
	const [selectedDiary, setSelectedDiary] = useState<IDiary | null>(null)

	// first load
	useEffect(() => {
		getUserDiaries()
	}, [])

	const getUserDiaries = async () => {
		setIsLoading(true)
		const data = await getDiaries()

		if (data) {
			setDiaries(data.content)

			// find selected diary or set null
			if (selectedDiary) {
				setSelectedDiary(data?.content.find((d) => d.id === selectedDiary?.id) ?? null)
			}
		} else {
			// set null for selected diary
			setSelectedDiary(null)
		}

		setIsLoading(false)
	}

	const onDelete = async (d: IDiary | null) => {
		if (!d) return
		setIsLoading(true)
		const data = await deleteDiary(d.id)

		if (data == false) {
			// error
			// TODO: notification
		}

		getUserDiaries()
	}

	const onSubmit = async (diary: IDiary) => {
		if (!diary || !diary.title || !diary.content) return
		setIsLoading(true)

		let data: IDiary | null = null

		if (diary.id === 0) {
			// create new if id equal 0
			data = await createDiary(diary.title, diary.content)
		} else if (diary.id > 0) {
			// update if diary id is not 0
			data = await updateDiary(diary.id, diary.title, diary.content)
		}

		if (!data) {
			// error
			// TODO: notification
		}

		getUserDiaries()
	}

	const onDraftCreate = () => {
		setSelectedDiary({
			id: 0,
			userId: '',
			title: '',
			content: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		})
	}

	return (
		<section className='w-full mx-auto max-w-[1500px] grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-18 px-6'>
			<Loading isLoading={isLoading} />

			<DiaryForm diary={selectedDiary} handleSubmit={onSubmit} onDelete={onDelete} />

			<DiaryAside
				diaries={diaries}
				selectedDiary={selectedDiary}
				onCreate={onDraftCreate}
				onDelete={onDelete}
				onSelectDiary={setSelectedDiary}
			/>
		</section>
	)
}

export default withAuth(DiaryPage)
