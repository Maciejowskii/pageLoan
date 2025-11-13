import { z } from 'zod'

export const loanApplicationSchema = z.object({
	firstName: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
	lastName: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
	email: z.string().email('Podaj prawidłowy email'),
	phone: z.string().regex(/^[0-9\s\-\+\(\)]{9,}$/, 'Podaj prawidłowy numer telefonu'),
	amount: z.number().min(500, 'Min. 500 zł').max(150000, 'Max. 150 000 zł'),
	period: z.number().min(3, 'Min. 3 miesiące').max(60, 'Max. 60 miesięcy'),
	pesel: z.string().regex(/^[0-9]{11}$/, 'PESEL musi mieć 11 cyfr'),
	employment: z.enum(['employed', 'self-employed', 'retired', 'other']),
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
