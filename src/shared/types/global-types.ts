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
