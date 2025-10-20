'use client'

import React, { useEffect, useState } from 'react'

import { useAuth } from '@hooks'
import { getDiaries } from '@services'
import type { IDiary } from '@shared/types'

export default function DiaryPage() {
	const { isLoading, user } = useAuth()

	const [diary, setDiary] = useState<IDiary[] | null>(null)
	const [text, setText] = useState<string>('')
	const [theme, setTheme] = useState<'dark' | 'light'>('light')
	const [editing, setEditing] = useState<boolean>(false)

	useEffect(() => {
		if (isLoading || !user) return

		getUserDiaries()
	}, [isLoading])

	const getUserDiaries = async () => {
		const data = await getDiaries()

		if (data?.content) setDiary(data.content)
	}

	function handleSave(e?: React.FormEvent) {
		e?.preventDefault()
		// const trimmed = text.trim()

		// TODO: save
	}

	function handleDelete() {
		// const d = targetDate || date
		// TODO: del
	}

	function handleClearAll() {
		if (!confirm('Clear ALL diary entries? This cannot be undone.')) return

		//TODO: clear
	}

	return (
		<div className='w-full min-h-screen mt-26 px-6'>
			<section className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
				{/* Form */}
				<form
					onSubmit={handleSave}
					className='md:col-span-2 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 shadow-sm'
				>
					<div className='flex items-center gap-3 mb-4'>
						<label className='text-sm font-medium'>Date</label>
						<input
							type='date'
							className='ml-auto bg-white dark:bg-slate-700 rounded px-2 py-1 border dark:border-slate-700'
							aria-label='Choose date'
						/>
						<button type='button' className='ml-2 text-sm px-2 py-1 rounded border'>
							Today
						</button>
					</div>

					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Write your opinion, thoughts, or short diary entry...'
						rows={12}
						className='w-full rounded-lg p-3 resize-vertical bg-white dark:bg-slate-700 border dark:border-slate-700'
					/>

					<div className='flex items-center gap-3 mt-4'>
						<button type='submit' className='rounded px-4 py-2 bg-indigo-600 text-white hover:opacity-95'>
							{editing ? 'Update' : 'Save'}
						</button>

						<button type='button' className='rounded px-3 py-2 border'>
							Reset
						</button>

						<button
							type='button'
							onClick={() => handleDelete()}
							className='rounded px-3 py-2 border text-red-600 dark:text-red-300'
						>
							Delete
						</button>

						<div className='ml-auto text-sm opacity-80'>Entries: </div>
					</div>
				</form>

				{/* Entries list */}
				<aside className='bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm'>
					<h2 className='font-semibold mb-4'>Записи</h2>

					<ul className=''>
						{!diary ? (
							<div className='mt-2 text-xs opacity-70'>
								Tip: entries are stored locally in your browser. Use export/import for backups (not
								implemented).
							</div>
						) : (
							diary.map((d) => (
								<li className='mt-2 text-base border-t border-gray-800 border-dotted' key={d.id}>
									{d.title}
								</li>
							))
						)}
					</ul>
				</aside>
			</section>
		</div>
	)
}
