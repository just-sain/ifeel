export const validatePhone = (phone: string): boolean => {
	const phoneRegex = /^\+7\d{10}$/

	return phoneRegex.test(phone)
}

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
	return password.length >= 8
}
