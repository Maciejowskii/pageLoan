import { z } from 'zod'
import { validatePESEL } from './peselValidator'

export const loanApplicationSchema = z.object({
	firstName: z.string().min(2, 'Imię musi mieć minimum 2 znaki'),
	lastName: z.string().min(2, 'Nazwisko musi mieć minimum 2 znaki'),
	email: z.string().email('Nieprawidłowy adres email'),
	phone: z.string().min(9, 'Numer telefonu musi mieć minimum 9 cyfr'),
	pesel: z
		.string()
		.length(11, 'PESEL musi mieć dokładnie 11 cyfr')
		.regex(/^\d+$/, 'PESEL może zawierać tylko cyfry')
		.refine(
			pesel => {
				const validation = validatePESEL(pesel)
				return validation.isValid
			},
			{
				message: 'Nieprawidłowy numer PESEL',
			}
		),
	amount: z.number().min(500).max(150000),
	period: z.number().min(3).max(60),
	employment: z.string().min(1, 'Wybierz status zatrudnienia'),
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
