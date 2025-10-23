export const API_URL = process.env.NEXT_PUBLIC_API
export const WS_URL = process.env.NEXT_PUBLIC_WS

export const getAuthToken = () => localStorage.getItem('jwt')
export const setAuthToken = (token: string) => localStorage.setItem('jwt', token)
export const clearAuthToken = () => localStorage.removeItem('jwt')

export const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1]))
	} catch {
		return {}
	}
}
