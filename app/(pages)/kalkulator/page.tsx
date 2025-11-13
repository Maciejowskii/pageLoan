import { LoanCalculatorAdvanced } from '@/components/sections/CalculatorAdvanced'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Kalkulator pożyczki - KubuśPożyczki',
	description: 'Interaktywny kalkulator pożyczki. Sprawdź jaką kwotę możesz otrzymać.',
}

export default function KalkulatorPage() {
	return (
		<main className='min-h-screen bg-neutral-50'>
			<section className='py-16'>
				<div className='section-container'>
					<div className='mb-16 text-center'>
						<h1 className='text-5xl font-bold text-neutral-900 mb-4'>Kalkulator pożyczki</h1>
						<p className='text-lg text-neutral-600 max-w-2xl mx-auto'>
							Sprawdź ile możesz pożyczyć i jakie będą Twoje raty. Wszystkie kalkulacje są w pełni automatyczne i
							bezpłatne.
						</p>
					</div>

					<LoanCalculatorAdvanced />

					{/* CTA */}
					<div className='mt-16 text-center'>
						<p className='text-neutral-600 mb-6'>Podoba Ci się ta kwota?</p>
						<Link
							href='/wniosek'
							className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-bold rounded-xl hover:shadow-2xl transition transform hover:scale-105'
						>
							Przejdź do wniosku <ArrowRight className='w-5 h-5' />
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
