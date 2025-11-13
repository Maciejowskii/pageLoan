// components/forms/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validations'
import { z } from 'zod'

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
	})
	const onSubmit = async (data: z.infer<typeof contactSchema>) => {
		setIsSubmitting(true)
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/send-contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				setSubmitStatus('success')
				reset()
				setTimeout(() => setSubmitStatus('idle'), 5000)
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Error:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{submitStatus === 'success' && (
				<div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
					<p className='text-green-800 font-medium'>✓ Wiadomość wysłana! Odpowiemy wkrótce.</p>
				</div>
			)}

			{submitStatus === 'error' && (
				<div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
					<p className='text-red-800 font-medium'>✗ Błąd przy wysyłaniu. Spróbuj ponownie.</p>
				</div>
			)}

			<div>
				<label className='block text-sm font-medium text-neutral-700 mb-2'>Imię i nazwisko</label>
				<input
					type='text'
					{...register('name')}
					className='input-base'
					placeholder='Jan Kowalski'
					disabled={isSubmitting}
				/>
				{typeof errors.name?.message === 'string' && (
					<p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-neutral-700 mb-2'>Email</label>
				<input
					type='email'
					{...register('email')}
					className='input-base'
					placeholder='jan@example.com'
					disabled={isSubmitting}
				/>
				{errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>}
			</div>

			<div>
				<label className='block text-sm font-medium text-neutral-700 mb-2'>Temat</label>
				<input
					type='text'
					{...register('subject')}
					className='input-base'
					placeholder='Temat wiadomości'
					disabled={isSubmitting}
				/>
				{errors.subject && <p className='text-red-600 text-sm mt-1'>{errors.subject.message}</p>}
			</div>

			<div>
				<label className='block text-sm font-medium text-neutral-700 mb-2'>Wiadomość</label>
				<textarea
					{...register('message')}
					className='input-base min-h-32 resize-none'
					placeholder='Twoja wiadomość...'
					disabled={isSubmitting}
				/>
				{errors.message && <p className='text-red-600 text-sm mt-1'>{errors.message.message}</p>}
			</div>

			<button type='submit' disabled={isSubmitting} className='w-full btn-primary'>
				{isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
			</button>
		</form>
	)
}
