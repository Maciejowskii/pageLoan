// app/(pages)/kontakt/page.tsx
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Kontakt - KubuśPożyczkia',
	description: 'Skontaktuj się z nami. Jesteśmy dostępni 24/7.',
}

export default function KontaktPage() {
	return (
		<main className='min-h-screen bg-neutral-50 py-12'>
			<div className='section-container'>
				<div className='mb-16 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-4'>Skontaktuj się z nami</h1>
					<p className='text-lg text-neutral-600 max-w-2xl mx-auto'>
						Masz pytania? Nasz zespół obsługi klienta jest gotów Ci pomóc 24/7
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
					{/* Email */}
					<div className='bg-white p-8 rounded-lg shadow'>
						<Mail className='w-12 h-12 text-primary-700 mb-4' />
						<h3 className='text-xl font-bold text-neutral-900 mb-2'>Email</h3>
						<p className='text-neutral-600 mb-4'>Wyślij nam wiadomość, odpowiemy w ciągu 30 minut</p>
						<a href='mailto:wolertjakub455@gmail.com' className='text-primary-700 font-semibold hover:underline'>
							wolertjakub455@gmail.com
						</a>
					</div>

					{/* Phone */}
					<div className='bg-white p-8 rounded-lg shadow'>
						<Phone className='w-12 h-12 text-primary-700 mb-4' />
						<h3 className='text-xl font-bold text-neutral-900 mb-2'>Telefon</h3>
						<p className='text-neutral-600 mb-4'>Zadzwoń do nas, mówimy po polsku i angielsku</p>
						<a href='tel:+48535645322' className='text-primary-700 font-semibold hover:underline'>
							+48 535 645 322
						</a>
					</div>

					{/* Address */}
					<div className='bg-white p-8 rounded-lg shadow'>
						<MapPin className='w-12 h-12 text-primary-700 mb-4' />
						<h3 className='text-xl font-bold text-neutral-900 mb-2'>Adres</h3>
						<p className='text-neutral-600'>
							ul. Targowa 6 lok. 5
							<br />
							72-010 Police
							<br />
							Polska
						</p>
					</div>
				</div>

				{/* Form */}
				{/* <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
					<ContactForm />
				</div> */}

				{/* Hours */}
				<div className='max-w-2xl mx-auto mt-12 bg-primary-50 border-l-4 border-primary-700 p-6 rounded'>
					<div className='flex items-start gap-4'>
						<Clock className='w-6 h-6 text-primary-700 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-bold text-neutral-900 mb-3'>Godziny otwarcia</h3>
							<div className='grid grid-cols-3 gap-12 text-sm text-neutral-700'>
								<div>
									<p className='font-semibold'>Poniedziałek - piątek</p>
									<p>8:00 - 22:00</p>
								</div>
								<div>
									<p className='font-semibold'>Sobota</p>
									<p>10:00 - 18:00</p>
								</div>
								<div>
									<p className='font-semibold'>Niedziela</p>
									<p>10:00 - 16:00</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
