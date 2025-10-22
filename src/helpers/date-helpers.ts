import { format, isValid, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export const normalizeDateIso = (date: Date | string): string => {
	if (!date) return ''

	let dateObj: Date

	if (typeof date === 'string') {
		dateObj = parseISO(date)
	} else if (date instanceof Date) {
		dateObj = date
	} else {
		return ''
	}

	if (!isValid(dateObj)) {
		return ''
	}

	return format(dateObj, 'dd.MM.yyyy, HH:mm', { locale: ru })
}
