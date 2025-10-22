export interface IDiary {
	id: number
	userId: string
	title: string | null
	content: string | null
	createdAt: string | Date | null
	updatedAt: string | Date | null
}
