'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@hooks'
import { Button, Input } from '@ui'

export default function LoginPage() {
	const { push } = useRouter()
	const { login } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		const success = await login(email, password)

		if (success) {
			push('/')
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<div className='w-full max-w-md rounded-lg bg-white p-10 shadow-lg dark:bg-gray-800'>
				<h2 className='mb-8 text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>
					Войти в аккаунт
				</h2>

				<form onSubmit={handleSubmit}>
					<Input
						id='email'
						label='Почта'
						required={true}
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						id='password'
						label='Пароль'
						required={true}
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button className='w-full' type='submit'>
						Войти
					</Button>

					<Link
						className='mt-4 block text-center text-sm text-gray-700 hover:underline dark:text-gray-200'
						href='/register'
					>
						Нет аккаунта? Зарегистрироваться
					</Link>
				</form>
			</div>
		</div>
	)
}
