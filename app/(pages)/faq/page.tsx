'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Metadata } from 'next'

const FAQData = [
	{
		category: 'Ogólne',
		questions: [
			{
				q: 'Ile mogę pożyczyć?',
				a: 'Możesz pożyczyć od 500 zł do 150 000 zł. Dokładna kwota zależy od Twojego dochodu i historii kredytowej.',
			},
			{
				q: 'Ile czasu trwa cały proces?',
				a: 'Cały proces trwa średnio 5-25 minut. Decyzję otrzymasz w ciągu kilku minut. Pieniądze trafią na Twoje konto w ciągu 24 godzin roboczych.',
			},
			{
				q: 'Czy mogę pożyczyć bez zdolności kredytowej?',
				a: 'Oceniamy wiele czynników poza historią kredytową. Nawet jeśli masz niekorzystną historię, mamy dla Ciebie rozwiązanie.',
			},
		],
	},
	{
		category: 'Koszty',
		questions: [
			{
				q: 'Jakie są ukryte opłaty?',
				a: 'Nie ma żadnych ukrytych opłat. Wszystkie koszty są transparentne i podane przed podpisaniem umowy.',
			},
			{
				q: 'Jaka jest oprocentowanie?',
				a: 'Oprocentowanie wynosi od 4% do 12% rocznie, w zależności od Twojego profilu kredytowego. Wyliczysz go w naszym kalkulatorze.',
			},
			{
				q: 'Czy mogę spłacić szybciej?',
				a: 'Tak! Możesz spłacić pożyczkę wcześniej bez żadnych dodatkowych kar. Im szybciej spłacisz, tym mniej zapłacisz odsetek.',
			},
		],
	},
	{
		category: 'Bezpieczeństwo',
		questions: [
			{
				q: 'Czy moje dane są bezpieczne?',
				a: 'Tak, wszystkie Twoje dane są szyfrowane i zabezpieczone zgodnie ze standardami RODO. Nigdy nie udostępniamy Twoich danych osobom trzecim.',
			},
			{
				q: 'Czy mogę zaufać tej stronie?',
				a: 'Tak, jesteśmy zarejestrowaną instytucją finansową w KNF. Działamy legalnie i transparentnie.',
			},
			{
				q: 'Czy mogę anulować pożyczkę?',
				a: 'Tak, możesz anulować wniosek w ciągu 30 dni od podpisania umowy bez żadnych konsekwencji.',
			},
		],
	},
]

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	let globalIndex = 0

	return (
		<main className='min-h-screen bg-neutral-50 py-12'>
			<div className='section-container'>
				<div className='mb-16 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-4'>Często zadawane pytania</h1>
					<p className='text-lg text-neutral-600 max-w-2xl mx-auto'>
						Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych pożyczek.
					</p>
				</div>

				<div className='max-w-3xl mx-auto space-y-8'>
					{FAQData.map((category, catIndex) => (
						<div key={catIndex}>
							<h2 className='text-2xl font-bold text-primary-700 mb-4'>{category.category}</h2>

							<div className='space-y-3'>
								{category.questions.map((item, itemIndex) => {
									const index = globalIndex++
									return (
										<div
											key={index}
											className='bg-white rounded-lg shadow hover:shadow-lg transition border border-neutral-200'
										>
											<button
												onClick={() => toggleFAQ(index)}
												className='w-full p-6 text-left flex items-center justify-between hover:bg-neutral-50 transition'
											>
												<span className='font-semibold text-neutral-900 text-lg'>{item.q}</span>
												<ChevronDown
													className={`w-6 h-6 text-primary-700 transition-transform duration-300 ${
														openIndex === index ? 'rotate-180' : ''
													}`}
												/>
											</button>

											{openIndex === index && (
												<div className='px-6 pb-6 text-neutral-700 bg-neutral-50 border-t border-neutral-200'>
													{item.a}
												</div>
											)}
										</div>
									)
								})}
							</div>
						</div>
					))}
				</div>

				{/* Contact CTA */}
				<div className='mt-16 bg-gradient-to-r from-primary-700 to-primary-800 rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto'>
					<h3 className='text-2xl font-bold text-white mb-3'>Nie znalazłeś odpowiedzi?</h3>
					<p className='text-primary-100 mb-6'>
						Jeśli masz dodatkowe pytania, skontaktuj się z nami. Nasz zespół obsługi klienta jest dostępny 24/7.
					</p>
					<a href='/kontakt' className='inline-block btn-primary bg-white text-primary-700 hover:bg-neutral-50'>
						Skontaktuj się
					</a>
				</div>
			</div>
		</main>
	)
}
