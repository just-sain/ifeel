const EnumMood = {
	HAPPY: 'Счастливый',
	CALM: 'Спокойный',
	RELAXED: 'Расслабленный',
	MOTIVATED: 'Мотивированный',
	PRODUCTIVE: 'Продуктивный',
	FOCUSED: 'Сосредоточенный',
	ENERGETIC: 'Энергичный',
	GRATEFUL: 'Благодарный',
	TIRED: 'Усталый',
	SAD: 'Грустный',
	DEPRESSED: 'Депрессивный',
	ANXIOUS: 'Тревожный',
	ANGRY: 'Злой',
	STRESSED: 'Напряжённый',
	LONELY: 'Одинокий',
	HOPEFUL: 'Надеющийся',
	CONFIDENT: 'Уверенный',
	INSPIRED: 'Вдохновлённый',
	NEUTRAL: 'Нейтральный',
	BORED: 'Скучающий',
} as const

export type EnumMood = (typeof EnumMood)[keyof typeof EnumMood]

export interface IMood {
	id: number
	mood: keyof typeof EnumMood
	label: EnumMood
	note: string
	createdAt: string
}
