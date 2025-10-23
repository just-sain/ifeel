'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { validateEmail, validatePassword, validatePhone } from '@helpers'
import { useAuth } from '@hooks'
import { Button, Input, Loading } from '@ui'

export default function RegisterPage() {
	const { push } = useRouter()

	const { isLoading, register, user, refresh } = useAuth()

	// states
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	// errors
	const [phoneError, setPhoneError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [confirmPasswordError, setConfirmPasswordError] = useState('')

	// if user login redirect to home page
	useEffect(() => {
		if (isLoading || !user) return

		push('/')
	}, [isLoading])

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setPhone(value)

		if (value && !validatePhone(value)) {
			setPhoneError('Неверный формат телефона. Используйте +7XXXXXXXXXX')
		} else {
			setPhoneError('')
		}
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setEmail(value)

		if (value && !validateEmail(value)) {
			setEmailError('Неверный формат email')
		} else {
			setEmailError('')
		}
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setPassword(value)

		if (value && !validatePassword(value)) {
			setPasswordError('Пароль должен содержать минимум 8 символов')
		} else {
			setPasswordError('')
		}
	}

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setConfirmPassword(value)

		if (value && value !== password) {
			setConfirmPasswordError('Пароли не совпадают')
		} else {
			setConfirmPasswordError('')
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		let hasErrors = false

		// validating
		if (!validateEmail(email)) {
			setEmailError('Неверный формат email')
			hasErrors = true
		}
		if (!validatePhone(phone)) {
			setPhoneError('Неверный формат телефона. Используйте +7XXXXXXXXXX')
			hasErrors = true
		}
		if (!validatePassword(password)) {
			setPasswordError('Пароль должен содержать минимум 8 символов')
			hasErrors = true
		}
		if (password !== confirmPassword) {
			setConfirmPasswordError('Пароли не совпадают')
			hasErrors = true
		}

		if (hasErrors) return

		// register logic
		const data = await register(name, email, phone, password)

		if (data) {
			refresh()
			push('/')
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<Loading isLoading={isLoading} />

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
						error={emailError}
						id='email'
						label='Почта'
						required={true}
						type='email'
						value={email}
						onChange={handleEmailChange}
					/>

					<Input
						error={phoneError}
						id='phone'
						label='Телефон'
						placeholder='+7XXXXXXXXXX'
						required={true}
						type='tel'
						value={phone}
						onChange={handlePhoneChange}
					/>

					<Input
						error={passwordError}
						id='password'
						label='Пароль'
						required={true}
						type='password'
						value={password}
						onChange={handlePasswordChange}
					/>

					<Input
						error={confirmPasswordError}
						id='confirmPassword'
						label='Подтвердите пароль'
						required={true}
						type='password'
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
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
