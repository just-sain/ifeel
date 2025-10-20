'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Button, Input } from '@ui'

export default function RegisterPage() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (password !== confirmPassword) {
			// You can add better error handling here
			console.error("Passwords don't match")

			return
		}
		// You can add your registration logic here
		console.log('Registration attempt with:', { name, email, password })
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<div className='w-full max-w-md rounded-lg bg-white p-10 dark:bg-gray-800 shadow-lg'>
				<h2 className='mb-8 text-center text-3xl font-semibold text-black dark:text-white'>Создать аккаунт</h2>

				<form onSubmit={handleSubmit}>
					<Input
						id='name'
						label='Имя'
						required={true}
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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

					<Input
						id='confirmPassword'
						label='Подтвердите пароль'
						required={true}
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<Button className='w-full' type='submit'>
						Зарегистрироваться
					</Button>

					<Link
						className='mt-4 block text-center text-sm text-gray-700 hover:underline dark:text-gray-300'
						href='/login'
					>
						Уже есть аккаунт? Войти
					</Link>
				</form>
			</div>
		</div>
	)
}
