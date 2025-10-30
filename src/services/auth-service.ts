import type { IUser } from '@types'

import { API_URL, clearAuthToken, getAuthToken, setAuthToken } from './token'

// get me
export const getMe = async (): Promise<IUser | null> => {
	const token = getAuthToken()

	if (!token) return null

	try {
		const response = await fetch(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) console.warn('Failed to fetch user')

		return await response.json()
	} catch (error) {
		console.error('Get me error:', error)

		return null
	}
}

// login
export const login = async (email: string, password: string): Promise<{ token: string } | null> => {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		if (!response.ok) throw new Error('Login failed')
		const data = await response.json()

		setAuthToken(data.token)

		return data
	} catch (error) {
		console.error('Login error:', error)

		return null
	}
}

// register
export const register = async (
	fullName: string,
	email: string,
	phone: string,
	password: string,
): Promise<{ user: IUser; token: string } | null> => {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fullName, email, phone, password }),
		})

		if (!response.ok) throw new Error('Registration failed')
		const data = await response.json()

		setAuthToken(data.token)

		return data
	} catch (error) {
		console.error('Register error:', error)

		return null
	}
}

// logout
export const logout = async (): Promise<void> => {
	const token = getAuthToken()

	if (token) {
		try {
			await fetch(`${API_URL}/auth/logout`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch (error) {
			console.error('Logout error:', error)
		}
	}
	clearAuthToken()
}
