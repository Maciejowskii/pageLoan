'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loanApplicationSchema, LoanApplicationType } from '@/lib/validations'
import ReCAPTCHA from 'react-google-recaptcha'

export function LoanApplicationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoanApplicationType>({
		resolver: zodResolver(loanApplicationSchema),
	})

	const onSubmit = async (data: LoanApplicationType) => {
		if (!recaptchaToken) {
			setSubmitStatus('error')
			return
		}

		setIsSubmitting(true)
		setSubmitStatus('idle')

		try {
			const response = await fetch('/api/send-lead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...data,
					recaptchaToken,
				}),
			})

			if (response.ok) {
				setSubmitStatus('success')
				reset()
				setRecaptchaToken(null)
				// Opcjonalnie: redirect po 3 sekundach
				setTimeout(() => {
					setSubmitStatus('idle')
				}, 5000)
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Form submission error:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='max-w-2xl mx-auto space-y-6'>
			{/* Status Messages */}
			{submitStatus === 'success' && (
				<div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
					<p className='text-green-800 font-medium'>
						✓ Dziękujemy! Twój wniosek został wysłany. Skontaktujemy się z Tobą wkrótce.
					</p>
				</div>
			)}
			{submitStatus === 'error' && (
				<div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
					<p className='text-red-800 font-medium'>✗ Błąd podczas wysyłania. Spróbuj ponownie.</p>
				</div>
			)}

			{/* Personal Data */}
			<fieldset className='space-y-4'>
				<legend className='text-lg font-semibold text-neutral-900'>Dane osobowe</legend>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Imię *</label>
						<input
							type='text'
							{...register('firstName')}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='Jan'
							disabled={isSubmitting}
						/>
						{errors.firstName && <p className='text-red-600 text-sm mt-1'>{errors.firstName.message}</p>}
					</div>

					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Nazwisko *</label>
						<input
							type='text'
							{...register('lastName')}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='Kowalski'
							disabled={isSubmitting}
						/>
						{errors.lastName && <p className='text-red-600 text-sm mt-1'>{errors.lastName.message}</p>}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Email *</label>
						<input
							type='email'
							{...register('email')}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='jan@example.com'
							disabled={isSubmitting}
						/>
						{errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>}
					</div>

					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Telefon *</label>
						<input
							type='tel'
							{...register('phone')}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='+48 123 456 789'
							disabled={isSubmitting}
						/>
						{errors.phone && <p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>}
					</div>
				</div>

				<div>
					<label className='block text-sm font-medium text-neutral-700 mb-2'>PESEL *</label>
					<input
						type='text'
						{...register('pesel')}
						className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
						placeholder='00000000000'
						disabled={isSubmitting}
					/>
					{errors.pesel && <p className='text-red-600 text-sm mt-1'>{errors.pesel.message}</p>}
				</div>
			</fieldset>

			{/* Loan Details */}
			<fieldset className='space-y-4'>
				<legend className='text-lg font-semibold text-neutral-900'>Szczegóły pożyczki</legend>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Kwota pożyczki (PLN) *</label>
						<input
							type='number'
							{...register('amount', { valueAsNumber: true })}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='50000'
							min='500'
							max='150000'
							disabled={isSubmitting}
						/>
						{errors.amount && <p className='text-red-600 text-sm mt-1'>{errors.amount.message}</p>}
					</div>

					<div>
						<label className='block text-sm font-medium text-neutral-700 mb-2'>Okres spłaty (miesiące) *</label>
						<input
							type='number'
							{...register('period', { valueAsNumber: true })}
							className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
							placeholder='24'
							min='3'
							max='60'
							disabled={isSubmitting}
						/>
						{errors.period && <p className='text-red-600 text-sm mt-1'>{errors.period.message}</p>}
					</div>
				</div>
			</fieldset>

			{/* Employment Info */}
			<fieldset className='space-y-4'>
				<legend className='text-lg font-semibold text-neutral-900'>Informacje zawodowe</legend>

				<div>
					<label className='block text-sm font-medium text-neutral-700 mb-2'>Status zatrudnienia *</label>
					<select
						{...register('employment')}
						className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
						disabled={isSubmitting}
					>
						<option value=''>Wybierz status</option>
						<option value='employed'>Pracownik najemny</option>
						<option value='self-employed'>Pracownik na własny rachunek</option>
						<option value='retired'>Emeryt/Rencista</option>
						<option value='other'>Inne</option>
					</select>
					{errors.employment && <p className='text-red-600 text-sm mt-1'>{errors.employment.message}</p>}
				</div>

				<div>
					<label className='block text-sm font-medium text-neutral-700 mb-2'>Miesięczny dochód netto (PLN) *</label>
					<input
						type='number'
						{...register('income', { valueAsNumber: true })}
						className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
						placeholder='5000'
						min='0'
						disabled={isSubmitting}
					/>
					{errors.income && <p className='text-red-600 text-sm mt-1'>{errors.income.message}</p>}
				</div>
			</fieldset>

			{/* Consents */}
			<fieldset className='space-y-3'>
				<legend className='text-lg font-semibold text-neutral-900'>Zgody</legend>

				<label className='flex items-start gap-3'>
					<input
						type='checkbox'
						{...register('agreeTerms')}
						className='mt-1 w-4 h-4 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500'
						disabled={isSubmitting}
					/>
					<span className='text-sm text-neutral-700'>
						Zapoznałem się i akceptuję{' '}
						<a href='/regulamin' className='text-primary-600 hover:underline'>
							regulamin
						</a>{' '}
						*
					</span>
				</label>
				{errors.agreeTerms && <p className='text-red-600 text-sm'>{errors.agreeTerms.message}</p>}

				<label className='flex items-start gap-3'>
					<input
						type='checkbox'
						{...register('agreePrivacy')}
						className='mt-1 w-4 h-4 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500'
						disabled={isSubmitting}
					/>
					<span className='text-sm text-neutral-700'>
						Zapoznałem się i akceptuję{' '}
						<a href='/polityka-prywatnosci' className='text-primary-600 hover:underline'>
							politykę prywatności
						</a>{' '}
						*
					</span>
				</label>
				{errors.agreePrivacy && <p className='text-red-600 text-sm'>{errors.agreePrivacy.message}</p>}

				<label className='flex items-start gap-3'>
					<input
						type='checkbox'
						{...register('agreeMarketing')}
						className='mt-1 w-4 h-4 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500'
						disabled={isSubmitting}
					/>
					<span className='text-sm text-neutral-700'>Chcę otrzymywać oferty specjalne i informacje marketingowe</span>
				</label>
			</fieldset>

			{/* reCAPTCHA */}
			<>
				<ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={setRecaptchaToken} />
			</>

			{/* Submit Button */}
			<button
				type='submit'
				disabled={isSubmitting || !recaptchaToken}
				className='w-full bg-primary-700 hover:bg-primary-800 disabled:bg-neutral-400 text-white font-semibold py-3 rounded-lg transition duration-200'
			>
				{isSubmitting ? 'Wysyłanie...' : 'Wyślij wniosek'}
			</button>

			<p className='text-center text-sm text-neutral-600'>
				Twoje dane są bezpieczne i szyfrowane. Nigdy nie udostępnimy ich osobom trzecim.
			</p>
		</form>
	)
}
