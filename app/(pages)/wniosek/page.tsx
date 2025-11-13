import { HeroWniosek } from '@/components/sections/HeroWniosek'
import { LoanApplicationFormAdvanced } from '@/components/forms/LoanApplicationFormAdvanced'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Złóż wniosek - KubuśPożyczki',
	description: 'Złóż wniosek o pożyczkę do 150 000 PLN w zaledwie kilka minut.',
}

export default function WniosekPage() {
	return (
		<main className='min-h-screen'>
			<HeroWniosek />

			<section className='py-16 bg-neutral-50'>
				<div className='section-container'>
					<div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 -mt-20 relative z-10 mb-12'>
						<h2 className='text-3xl font-bold text-neutral-900 text-center mb-2'>Złóż wniosek w 4 krokach</h2>
						<p className='text-center text-neutral-600 mb-8'>
							Prosty i szybki proces. Wszystkie wymagane informacje w jednym miejscu.
						</p>

						<LoanApplicationFormAdvanced />
					</div>

					{/* Trust signals */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-12'>
						<div className='text-center'>
							<div className='text-4xl font-bold text-primary-700 mb-2'>50k+</div>
							<p className='text-neutral-600 text-sm'>Zadowolonych klientów</p>
						</div>
						<div className='text-center'>
							<div className='text-4xl font-bold text-accent-600 mb-2'>24h</div>
							<p className='text-neutral-600 text-sm'>Otrzymasz pieniądze</p>
						</div>
						<div className='text-center'>
							<div className='text-4xl font-bold text-primary-700 mb-2'>0 zł</div>
							<p className='text-neutral-600 text-sm'>Ukrytych opłat</p>
						</div>
						<div className='text-center'>
							<div className='text-4xl font-bold text-accent-600 mb-2'>100%</div>
							<p className='text-neutral-600 text-sm'>Bezpieczne dane</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
