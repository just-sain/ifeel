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
				// redirect to login page if not auth
				router.push('/login')
			}
		}, [isLoading, router])

		// loading
		if (isLoading) {
			return <div>Loading...</div>
		}

		// prevent rendering while redirecting
		if (!user) {
			return null
		}

		return <WrappedComponent {...props} />
	}

	WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`

	return WithAuthComponent
}
