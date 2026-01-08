import { z } from 'zod'

/**
 * Walidacja numeru PESEL według algorytmu stosowanego w Polsce
 */
function validatePESEL(pesel: string): boolean {
	if (pesel.length !== 11) return false
	if (!/^\d+$/.test(pesel)) return false

	const digits = pesel.split('').map(Number)

	// Wyciągnij datę urodzenia
	let year = digits[0] * 10 + digits[1]
	let month = digits[2] * 10 + digits[3]
	const day = digits[4] * 10 + digits[5]

	// Określ wiek na podstawie miesiąca
	if (month > 80) {
		year += 1800
		month -= 80
	} else if (month > 60) {
		year += 2200
		month -= 60
	} else if (month > 40) {
		year += 2100
		month -= 40
	} else if (month > 20) {
		year += 2000
		month -= 20
	} else {
		year += 1900
	}

	// Sprawdź poprawność daty
	if (month < 1 || month > 12) return false
	if (day < 1 || day > 31) return false

	const date = new Date(year, month - 1, day)
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
		return false
	}

	// Sprawdź czy data nie jest w przyszłości
	if (date > new Date()) return false

	// Walidacja cyfry kontrolnej (checksum)
	const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
	let sum = 0

	for (let i = 0; i < 10; i++) {
		sum += digits[i] * weights[i]
	}

	const checksum = sum % 10 === 0 ? 0 : 10 - (sum % 10)

	return checksum === digits[10]
}

export const loanApplicationSchema = z.object({
	firstName: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
	lastName: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
	email: z.string().email('Podaj prawidłowy email'),
	phone: z.string().regex(/^[0-9\s\-\+\(\)]{9,}$/, 'Podaj prawidłowy numer telefonu'),
	amount: z.number().min(500, 'Min. 500 zł').max(150000, 'Max. 150 000 zł'),
	period: z.number().min(3, 'Min. 3 miesiące').max(60, 'Max. 60 miesięcy'),
	pesel: z
		.string()
		.regex(/^[0-9]{11}$/, 'PESEL musi mieć 11 cyfr')
		.refine(pesel => validatePESEL(pesel), {
			message: 'Nieprawidłowy numer PESEL - sprawdź poprawność',
		}),
	employment: z.enum(['employed', 'self-employed', 'retired', 'other', 'work-abroad'], {
		errorMap: () => ({ message: 'Wybierz status zatrudnienia' }),
	}),
	income: z.number().min(0, 'Dochód nie może być ujemny'),
	agreeTerms: z.boolean().refine(val => val === true, {
		message: 'Musisz zaakceptować regulamin',
	}),
	agreePrivacy: z.boolean().refine(val => val === true, {
		message: 'Musisz zaakceptować politykę prywatności',
	}),
	agreeMarketing: z.boolean().optional(),
})

export type LoanApplicationType = z.infer<typeof loanApplicationSchema>

export const contactSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	message: z.string().min(10),
	subject: z.string().min(5),
})
