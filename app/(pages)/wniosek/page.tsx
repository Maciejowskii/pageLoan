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
			<br />
			<br />
			<br />
			<section className='py-16 bg-neutral-50'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 -mt-20 relative z-10 mb-12'>
						<h2 className='text-3xl font-bold text-neutral-900 text-center mb-2'>Złóż wniosek w 4 krokach</h2>
						<p className='text-center text-neutral-600 mb-8'>
							Prosty i szybki proces. Wszystkie wymagane informacje w jednym miejscu.
						</p>

						<LoanApplicationFormAdvanced />
					</div>
				</div>
			</section>
		</main>
	)
}
