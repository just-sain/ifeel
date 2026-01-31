import type { EnumRole } from '@types'
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

const rolesNames: Record<EnumRole, string> = {
	ROLE_ADMIN: 'Администратор',
	ROLE_USER: 'Пользователь',
	ROLE_PSYCHOLOGIST: 'Психолог',
}

export const normalizeRole = (role: EnumRole): string => {
	return rolesNames[role] || ''
}
