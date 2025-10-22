import type { IDiary, IPagination } from '@shared/types'

import { API_URL, getAuthToken } from './token'

// get diaries with pagination
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
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/diary`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, content }),
		})

		if (!response.ok) throw new Error('Create diary failed')

		return await response.json()
	} catch (error) {
		console.error('Create diary error:', error)

		return null
	}
}

// update diary
export const updateDiary = async (id: number, title: string, content: string): Promise<IDiary | null> => {
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/diary/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, content }),
		})

		if (!response.ok) throw new Error('Update diary failed')

		return await response.json()
	} catch (error) {
		console.error('Update diary error:', error)

		return null
	}
}

// delete diary
export const deleteDiary = async (id: number): Promise<boolean> => {
	const token = getAuthToken()

	if (!token) return false

	try {
		const response = await fetch(`${API_URL}/diary/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			console.error('Delete diary failed:', response.status, response.statusText)

			return false
		}

		if (response.status === 204 || response.headers.get('content-length') === '0') {
			return true
		}

		try {
			const data = await response.json()

			return !!data
		} catch {
			return true
		}
	} catch (error) {
		console.error('Delete diary error:', error)

		return false
	}
}
