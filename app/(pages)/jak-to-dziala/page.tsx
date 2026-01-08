import { Metadata } from 'next'
import { Check } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Jak to działa - KubuśPożyczki',
	description: 'Poznaj proces udzielania pożyczki w 3 prostych krokach',
}

export default function JakToDzialaPage() {
	const steps = [
		{
			number: 1,
			title: 'Wypełnij wniosek',
			description: 'Zajmie Ci to zaledwie 5 minut. Potrzebujesz tylko podstawowych danych osobowych.',
			details: [
				'Dane osobowe (imię, nazwisko, PESEL)',
				'Kontakt (email, telefon)',
				'Dane finansowe (dochód, zatrudnienie)',
				'Kwota i okres pożyczki',
			],
		},
		{
			number: 2,
			title: 'Weryfikacja tożsamości',
			description: 'Aby zatwierdzić pożyczkę, musimy upewnić się że jesteś Ty.',
			details: [
				'Weryfikacja instant (Kontomatik)',
				'Lub przelew 1 grosz na Twoje konto',
				'Sprawdzenie historii kredytowej',
				'Analiza zdolności kredytowej',
			],
		},
		{
			number: 3,
			title: 'Pieniądze na koncie',
			description: 'Po zatwierdzeniu pożyczka trafi na podane przez Ciebie konto bankowe.',
			details: [
				'Maksymalnie 24 godziny robocze',
				'Czasem nawet 1-2 godziny',
				'Przesyłka bezpieczna i szyfrowana',
				'Możliwość śledzenia statusu',
			],
		},
	]

	return (
		<main className='min-h-screen bg-neutral-50 py-12'>
			<div className='section-container'>
				<div className='mb-16 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-4'>Jak to działa?</h1>
					<p className='text-lg text-neutral-600 max-w-2xl mx-auto'>
						Proces udzielenia pożyczki jest prosty i szybki. Przejdź przez 3 kroki i miej pieniądze na koncie.
					</p>
				</div>

				{/* Steps */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
					{steps.map((step, index) => (
						<div key={index} className='relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition'>
							{/* Step number */}
							<div className='absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-800 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg'>
								{step.number}
							</div>

							<div className='pt-4'>
								<h3 className='text-2xl font-bold text-neutral-900 mb-3'>{step.title}</h3>
								<p className='text-neutral-600 mb-6'>{step.description}</p>

								<ul className='space-y-3'>
									{step.details.map((detail, i) => (
										<li key={i} className='flex items-start gap-3'>
											<Check className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
											<span className='text-sm text-neutral-700'>{detail}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{/* Timeline */}
				<div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12'>
					<h2 className='text-2xl font-bold text-neutral-900 mb-8 text-center'>Jak szybko to trwa?</h2>

					<div className='space-y-6'>
						<div className='flex gap-4'>
							<div className='flex flex-col items-center'>
								<div className='w-4 h-4 bg-primary-700 rounded-full'></div>
								<div className='w-1 h-16 bg-primary-200'></div>
							</div>
							<div>
								<p className='font-bold text-neutral-900'>5 minut</p>
								<p className='text-sm text-neutral-600'>Wypełnij formularz wniosku</p>
							</div>
						</div>

						<div className='flex gap-4'>
							<div className='flex flex-col items-center'>
								<div className='w-4 h-4 bg-primary-700 rounded-full'></div>
								<div className='w-1 h-16 bg-primary-200'></div>
							</div>
							<div>
								<p className='font-bold text-neutral-900'>15 minut</p>
								<p className='text-sm text-neutral-600'>Weryfikacja tożsamości</p>
							</div>
						</div>

						<div className='flex gap-4'>
							<div className='flex flex-col items-center'>
								<div className='w-4 h-4 bg-primary-700 rounded-full'></div>
								<div className='w-1 h-16 bg-primary-200'></div>
							</div>
							<div>
								<p className='font-bold text-neutral-900'>5 minut</p>
								<p className='text-sm text-neutral-600'>Decyzja pożyczkodawcy</p>
							</div>
						</div>

						<div className='flex gap-4'>
							<div className='flex flex-col items-center'>
								<div className='w-4 h-4 bg-green-500 rounded-full'></div>
							</div>
							<div>
								<p className='font-bold text-green-600'>30 minut</p>
								<p className='text-sm text-neutral-600'>Pieniądze na Twoim koncie</p>
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section - na dole strony */}
				<div className='bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Gotowy, aby rozpocząć?</h2>
					<p className='text-lg text-primary-50 mb-8 max-w-2xl mx-auto'>
						Wypełnij wniosek w zaledwie 5 minut i otrzymaj pieniądze na koncie nawet tego samego dnia.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Link
							href='/wniosek'
							className='px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition duration-300 text-lg'
						>
							Złóż wniosek teraz
						</Link>

						<Link
							href='/kalkulator'
							className='px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-700 transition duration-300 text-lg'
						>
							Sprawdź kwotę
						</Link>
					</div>

					{/* Dodatkowe linki nawigacyjne */}
					<div className='mt-8 pt-8 border-t border-primary-600'>
						<p className='text-primary-100 mb-4 text-sm'>Potrzebujesz więcej informacji?</p>
						<div className='flex flex-wrap justify-center gap-4 text-sm'>
							<Link href='/faq' className='text-white hover:text-primary-100 underline transition'>
								FAQ
							</Link>
							<Link href='/kontakt' className='text-white hover:text-primary-100 underline transition'>
								Kontakt
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
