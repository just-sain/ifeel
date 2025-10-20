import type { EnumMood, IMood, IPagination } from '@types'

import { API_URL, getAuthToken } from './token'

// get todays mood
interface IGetTodaysMoodPayload extends IPagination {
	content: IMood[]
}

export const getTodaysMood = async (): Promise<IGetTodaysMoodPayload | null> => {
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/mood`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error('Failed to fetch todays mood')

		return await response.json()
	} catch (error) {
		console.error('Get todays mood error:', error)

		return null
	}
}

// create/update mood
export const updateMood = async (mood: EnumMood, note: string): Promise<IMood | null> => {
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/mood`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ mood, note }),
		})

		if (!response.ok) throw new Error('Failed to update mood')

		return await response.json()
	} catch (error) {
		console.error('Update mood error:', error)

		return null
	}
}
