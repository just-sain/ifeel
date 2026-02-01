export interface IPagination {
	page: number
	size: number
	totalElements: number
	totalPages: number
	last: boolean
}

export type ChatJoinMode = 'anonymous' | 'psychologist' | 'roulette'

export interface SupportArticle {
	id: string
	title: string
	description: string
	createdAt: string
}

export interface SupportTechnique {
	id: string
	category: string
	title: string
	// description теперь массив блоков для красивого рендеринга
	description: Array<{
		type: 'text' | 'list'
		content: string | string[]
	}>
}

export interface SupportBook {
	id: string
	path: string
	title: string
	description: string
}

export const whatsappNumber = '+77086907725'
export const whatsappText = encodeURIComponent('Здравствуйте, хочу записаться на консультацию.')
