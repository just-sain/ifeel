export const getAuthToken = () => localStorage.getItem('jwt')
export const setAuthToken = (token: string) => localStorage.setItem('jwt', token)
export const clearAuthToken = () => localStorage.removeItem('jwt')

export const API_URL = process.env.NEXT_PUBLIC_API
