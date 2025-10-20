'use client'

import type { ComponentType } from 'react'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@hooks'

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const WithAuthComponent: React.FC<P> = (props) => {
		const { user, isLoading } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (!isLoading && !user) {
				router.push('/login') // Redirect to login page if not authenticated
			}
		}, [user, isLoading, router])

		if (isLoading) {
			return <div>Loading...</div> // Or a proper loading component
		}

		if (!user) {
			return null // Prevent rendering while redirecting
		}

		return <WrappedComponent {...props} />
	}

	WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`

	return WithAuthComponent
}
