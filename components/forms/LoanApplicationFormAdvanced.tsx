'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loanApplicationSchema, LoanApplicationType } from '@/lib/validations'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

export function LoanApplicationFormAdvanced() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const [currentStep, setCurrentStep] = useState(0)
	const [completedSteps, setCompletedSteps] = useState<number[]>([])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		trigger,
	} = useForm<LoanApplicationType>({
		resolver: zodResolver(loanApplicationSchema),
		mode: 'onChange', // Real-time validation
	})

	const steps = [
		{ title: 'Dane osobowe', fields: ['firstName', 'lastName', 'email', 'phone', 'pesel'] },
		{ title: 'Kwota i okres', fields: ['amount', 'period'] },
		{ title: 'Zatrudnienie', fields: ['employment', 'income'] },
		{ title: 'Zgody', fields: ['agreeTerms', 'agreePrivacy', 'agreeMarketing'] },
	]

	const handleNextStep = async () => {
		const fieldsToValidate = steps[currentStep].fields as Array<keyof LoanApplicationType>
		const isValid = await trigger(fieldsToValidate)

		if (isValid) {
			if (!completedSteps.includes(currentStep)) {
				setCompletedSteps([...completedSteps, currentStep])
			}
			setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
		}
	}

	const handleStepClick = async (stepIndex: number) => {
		if (stepIndex > currentStep && !completedSteps.includes(stepIndex - 1)) {
			return
		}

		if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
			setCurrentStep(stepIndex)
		}
	}

	const onSubmit = async (data: LoanApplicationType) => {
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/send-lead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				setSubmitStatus('success')
				reset()
				setCurrentStep(0)
				setCompletedSteps([])
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{/* Status Messages */}
			<AnimatePresence>
				{submitStatus === 'success' && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl flex items-start gap-4'
					>
						<CheckCircle className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='text-green-900 font-bold text-lg'>Dziękujemy! Wniosek wysłany! 🎉</p>
							<p className='text-green-700 text-sm mt-1'>Skontaktujemy się z Tobą na podany email w ciągu 24 godzin.</p>
						</div>
					</motion.div>
				)}
				{submitStatus === 'error' && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-xl flex items-start gap-4'
					>
						<AlertCircle className='w-6 h-6 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='text-red-900 font-bold text-lg'>Błąd przy wysyłaniu</p>
							<p className='text-red-700 text-sm mt-1'>Spróbuj ponownie lub skontaktuj się z obsługą.</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Step Indicator */}
			<div className='flex justify-between items-center mb-8'>
				{steps.map((step, i) => (
					<motion.div key={i} className='flex items-center flex-1'>
						<motion.button
							type='button'
							onClick={() => handleStepClick(i)}
							disabled={isSubmitting || (i > currentStep && !completedSteps.includes(i - 1))}
							whileHover={i <= currentStep || completedSteps.includes(i - 1) ? { scale: 1.1 } : {}}
							className={`relative w-10 h-10 rounded-full font-bold transition-all duration-300 ${
								i <= currentStep
									? 'bg-gradient-to-r from-primary-700 to-accent-600 text-white shadow-lg'
									: completedSteps.includes(i - 1)
									? 'bg-gradient-to-r from-primary-700 to-accent-600 text-white shadow-lg'
									: 'bg-neutral-200 text-neutral-600 cursor-not-allowed opacity-50'
							}`}
						>
							{i + 1}
							{completedSteps.includes(i) && i < currentStep && <span className='ml-2'>✓</span>}
						</motion.button>

						{i < steps.length - 1 && (
							<div
								className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
									completedSteps.includes(i) ? 'bg-gradient-to-r from-primary-700 to-accent-600' : 'bg-neutral-200'
								}`}
							/>
						)}
					</motion.div>
				))}
			</div>

			<p className='text-center text-sm text-neutral-600 font-medium'>
				Krok {currentStep + 1} z {steps.length}: {steps[currentStep].title}
			</p>

			{/* Form Fields */}
			<div className='space-y-6 min-h-64'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className='space-y-4'
					>
						{/* Step 0: Personal Data */}
						{currentStep === 0 && (
							<>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-semibold text-neutral-900 mb-2'>Imię *</label>
										<input
											type='text'
											{...register('firstName')}
											placeholder='Jan'
											className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition'
											disabled={isSubmitting}
										/>
										{errors.firstName && (
											<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
												{errors.firstName.message}
											</motion.p>
										)}
									</div>

									<div>
										<label className='block text-sm font-semibold text-neutral-900 mb-2'>Nazwisko *</label>
										<input
											type='text'
											{...register('lastName')}
											placeholder='Kowalski'
											className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition'
											disabled={isSubmitting}
										/>
										{errors.lastName && (
											<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
												{errors.lastName.message}
											</motion.p>
										)}
									</div>
								</div>

								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-2'>Email *</label>
									<input
										type='email'
										{...register('email')}
										placeholder='jan@example.com'
										className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition w-full'
										disabled={isSubmitting}
									/>
									{errors.email && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.email.message}
										</motion.p>
									)}
								</div>

								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-2'>Telefon *</label>
									<input
										type='tel'
										{...register('phone')}
										placeholder='+48 123 456 789'
										className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition w-full'
										disabled={isSubmitting}
									/>
									{errors.phone && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.phone.message}
										</motion.p>
									)}
								</div>

								{/* ✅ ULEPSZONE POLE PESEL */}
								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-2'>
										PESEL *<span className='ml-2 text-xs text-neutral-500 font-normal'>(11 cyfr)</span>
									</label>
									<input
										type='text'
										{...register('pesel')}
										placeholder='00000000000'
										maxLength={11}
										inputMode='numeric'
										pattern='[0-9]*'
										className={`input-base bg-white hover:bg-neutral-50 focus:bg-white transition w-full ${
											errors.pesel ? 'border-red-500 ring-2 ring-red-200' : ''
										}`}
										disabled={isSubmitting}
										onInput={e => {
											// Tylko cyfry
											e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
										}}
									/>
									{errors.pesel && (
										<motion.p
											initial={{ opacity: 0, y: -5 }}
											animate={{ opacity: 1, y: 0 }}
											className='text-red-600 text-xs mt-1 flex items-center gap-1'
										>
											<AlertCircle className='w-3 h-3' />
											{errors.pesel.message}
										</motion.p>
									)}
									{!errors.pesel && watch('pesel')?.length === 11 && (
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className='text-green-600 text-xs mt-1 flex items-center gap-1'
										>
											<CheckCircle className='w-3 h-3' />
											PESEL prawidłowy
										</motion.p>
									)}
								</div>
							</>
						)}

						{/* Step 1: Loan Details */}
						{currentStep === 1 && (
							<>
								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-3'>
										Kwota pożyczki:
										<span className='text-primary-700 font-bold ml-2'>{watch('amount') || '50000'} PLN</span>
									</label>
									<input
										type='range'
										{...register('amount', { valueAsNumber: true })}
										min='500'
										max='150000'
										step='1000'
										className='w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-700'
										disabled={isSubmitting}
									/>
									<div className='flex justify-between text-xs text-neutral-500 mt-2'>
										<span>500 zł</span>
										<span>150 000 zł</span>
									</div>
								</div>

								<div className='pt-4'>
									<label className='block text-sm font-semibold text-neutral-900 mb-3'>
										Okres spłaty:
										<span className='text-primary-700 font-bold ml-2'>{watch('period') || '24'} miesięcy</span>
									</label>
									<input
										type='range'
										{...register('period', { valueAsNumber: true })}
										min='3'
										max='60'
										step='1'
										className='w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-700'
										disabled={isSubmitting}
									/>
									<div className='flex justify-between text-xs text-neutral-500 mt-2'>
										<span>3 miesiące</span>
										<span>60 miesięcy</span>
									</div>
								</div>
							</>
						)}

						{/* Step 2: Employment */}
						{currentStep === 2 && (
							<>
								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-2'>Status zatrudnienia *</label>
									<select
										{...register('employment')}
										className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition w-full'
										disabled={isSubmitting}
									>
										<option value=''>Wybierz status</option>
										<option value='Własna działalność gospodarcza'>Własna działalność gospodarcza</option>
										<option value='Praca na etacie'>Praca na etacie</option>
										<option value='Alimenty'>Alimenty</option>
										<option value='Inne'>Inne</option>
										<option value='Praca za granicą'>Praca za granicą</option>
									</select>
									{errors.employment && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.employment.message}
										</motion.p>
									)}
								</div>

								<div>
									<label className='block text-sm font-semibold text-neutral-900 mb-2'>Twój miesięczny dochód *</label>
									<input
										type='number'
										{...register('income', { valueAsNumber: true })}
										placeholder='5000'
										className='input-base bg-white hover:bg-neutral-50 focus:bg-white transition w-full'
										min='0'
										disabled={isSubmitting}
									/>
									{errors.income && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.income.message}
										</motion.p>
									)}
								</div>
							</>
						)}

						{/* Step 3: Consents */}
						{currentStep === 3 && (
							<>
								<div className='space-y-4'>
									<label className='flex items-start gap-3 cursor-pointer group'>
										<input
											type='checkbox'
											{...register('agreeTerms')}
											className='w-5 h-5 mt-1 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer'
											disabled={isSubmitting}
										/>
										<span className='text-sm text-neutral-700 group-hover:text-neutral-900'>
											Zapoznałem się i akceptuję{' '}
											<a href='/regulamin' className='text-primary-600 hover:underline font-semibold'>
												regulamin
											</a>{' '}
											*
										</span>
									</label>
									{errors.agreeTerms && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.agreeTerms.message}
										</motion.p>
									)}

									<label className='flex items-start gap-3 cursor-pointer group'>
										<input
											type='checkbox'
											{...register('agreePrivacy')}
											className='w-5 h-5 mt-1 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer'
											disabled={isSubmitting}
										/>
										<span className='text-sm text-neutral-700 group-hover:text-neutral-900'>
											Zapoznałem się i akceptuję{' '}
											<a href='/polityka-prywatnosci' className='text-primary-600 hover:underline font-semibold'>
												politykę prywatności
											</a>{' '}
											*
										</span>
									</label>
									{errors.agreePrivacy && (
										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-600 text-xs mt-1'>
											{errors.agreePrivacy.message}
										</motion.p>
									)}

									<label className='flex items-start gap-3 cursor-pointer group'>
										<input
											type='checkbox'
											{...register('agreeMarketing')}
											className='w-5 h-5 mt-1 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer'
											disabled={isSubmitting}
										/>
										<span className='text-sm text-neutral-700 group-hover:text-neutral-900'>
											Chcę otrzymywać oferty specjalne i informacje marketingowe
										</span>
									</label>
								</div>
							</>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation Buttons */}
			<div className='flex justify-between gap-4 pt-8 border-t-2 border-neutral-200'>
				<motion.button
					type='button'
					onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
					disabled={currentStep === 0 || isSubmitting}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-100 disabled:opacity-50 transition'
				>
					← Wróć
				</motion.button>

				{currentStep < steps.length - 1 ? (
					<motion.button
						type='button'
						onClick={handleNextStep}
						disabled={isSubmitting}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='ml-auto px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-semibold rounded-lg hover:shadow-xl transition'
					>
						Dalej →
					</motion.button>
				) : (
					<motion.button
						type='submit'
						disabled={isSubmitting}
						whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 102, 204, 0.4)' }}
						whileTap={{ scale: 0.95 }}
						className='ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-2xl disabled:opacity-50 flex items-center gap-2 transition'
					>
						{isSubmitting ? (
							<>
								<Loader className='w-5 h-5 animate-spin' />
								Wysyłanie...
							</>
						) : (
							<>✓ Wyślij wniosek</>
						)}
					</motion.button>
				)}
			</div>

			<p className='text-center text-xs text-neutral-600'>
				Twoje dane są chronione szyfrowaniem SSL. Nigdy nie sprzedamy Twoich danych.
			</p>
		</form>
	)
}
