const EnumRole = {
	USER: 'ROLE_USER',
	ADMIN: 'ROLE_ADMIN',
} as const

export type EnumRole = (typeof EnumRole)[keyof typeof EnumRole]

export interface IUser {
	id: string
	fullName: string
	email: string
	phone: null | string
	slug: null | string
	roles: EnumRole
	enabled: boolean
	createdAt: null | string
	updatedAt: null | string
}
