import type { IDiary, IPagination } from '@shared/types'

import { API_URL, getAuthToken } from './token'

// get diaries
interface IGetDiaries extends IPagination {
	content: IDiary[]
}

export const getDiaries = async (): Promise<IGetDiaries | null> => {
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/diary`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error('Failed to fetch user diaries')

		return await response.json()
	} catch (error) {
		console.error('User diaries error:', error)

		return null
	}
}

// create diary
export const createDiary = async (title: string, content: string): Promise<IDiary | null> => {
	try {
		const token = getAuthToken()

		if (!token) return null

		const response = await fetch(`${API_URL}/diary`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, content }),
		})

		if (!response.ok) throw new Error('Create diary failed')
		const data = await response.json()

		return data
	} catch (error) {
		console.error('Create diary error:', error)

		return null
	}
}
