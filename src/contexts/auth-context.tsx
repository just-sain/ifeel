'use client'

import { createContext } from 'react'

import type { IUser } from '../shared/types/auth-types'

export interface AuthContextType {
	isLoading: boolean
	user: IUser | null
	login: (email: string, password: string) => Promise<boolean>
	register: (fullName: string, email: string, phone: string, password: string) => Promise<boolean>
	logout: () => Promise<boolean>
	refresh: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>({
	isLoading: true,
	user: null,
	login: () => Promise.resolve(false),
	register: () => Promise.resolve(false),
	logout: () => Promise.resolve(false),
	refresh: () => Promise.resolve(false),
})
