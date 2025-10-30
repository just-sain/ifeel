'use client'

import { type ReactNode, useEffect, useState } from 'react'

import { AuthContext, type AuthContextType } from '@contexts'
import { getMe, login as loginService, logout as logoutService, register as registerService } from '@services'
import type { IUser } from '@types'

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const userData = await getMe()

				setUser(userData)
			} catch (error) {
				console.warn('Failed to initialize auth:', error)
			} finally {
				setIsLoading(false)
			}
		}

		initializeAuth()
	}, [])

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const result = await loginService(email, password)

			if (result) {
				refresh()

				return true
			}

			return false
		} catch (error) {
			console.error('Login failed:', error)

			return false
		}
	}

	const register = async (fullName: string, email: string, phone: string, password: string): Promise<boolean> => {
		try {
			const result = await registerService(fullName, email, phone, password)

			if (result) {
				setUser(result.user)

				return true
			}

			return false
		} catch (error) {
			console.error('Registration failed:', error)

			return false
		}
	}

	const logout = async (): Promise<boolean> => {
		try {
			await logoutService()
			setUser(null)

			return true
		} catch (error) {
			console.error('Logout failed:', error)

			return false
		}
	}

	const refresh = async (): Promise<boolean> => {
		try {
			const userData = await getMe()

			if (userData) {
				setUser(userData)
			}

			return true
		} catch (error) {
			console.error('Refresh user failed:', error)

			return false
		}
	}

	const value: AuthContextType = {
		user,
		isLoading,
		login,
		register,
		logout,
		refresh,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
