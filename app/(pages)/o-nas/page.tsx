import { Metadata } from 'next'
import { Award, Users, TrendingUp, Shield } from 'lucide-react'

export const metadata: Metadata = {
	title: 'O nas - KubuśPożyczki',
	description: 'Poznaj naszą firmę i dowiedz się dlaczego jesteśmy godnym zaufania partnerem finansowym.',
}

const stats = [
	{ icon: Users, label: 'Zadowolonych klientów', value: '50 000+' },
	{ icon: TrendingUp, label: 'Przyznanych pożyczek', value: '₹ 2 mld' },
	{ icon: Award, label: 'Lat na rynku', value: '15+' },
	{ icon: Shield, label: 'Procent akceptacji', value: '92%' },
]

export default function ONasPage() {
	return (
		<main className='min-h-screen bg-neutral-50'>
			{/* Hero */}
			<section className='bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-16'>
				<div className='section-container'>
					<h1 className='text-4xl md:text-5xl font-bold mb-6'>O nas</h1>
					<p className='text-lg text-primary-100 max-w-2xl'>
						KubuśPożyczki to nowoczesna platforma finansowa, która zmienia sposób, w jaki ludzie korzystają z pożyczek.
					</p>
				</div>
			</section>

			{/* Stats */}
			<section className='py-12 section-container'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{stats.map((stat, i) => (
						<div key={i} className='bg-white p-6 rounded-lg shadow text-center'>
							<stat.icon className='w-12 h-12 text-primary-700 mx-auto mb-4' />
							<p className='text-3xl font-bold text-neutral-900 mb-2'>{stat.value}</p>
							<p className='text-neutral-600'>{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			{/* Mission */}
			<section className='bg-white py-12'>
				<div className='section-container'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl font-bold text-neutral-900 mb-4'>Nasza misja</h2>
							<p className='text-neutral-700 mb-4'>
								Wierzymy, że każdy powinien mieć dostęp do szybkiego i niezawodnego finansowania. Dlatego utworzyliśmy
								KubuśPożyczki – platformę, która dostarcza rozwiązania finansowe bez biurokracji i zbędnych formalności.
							</p>
							<p className='text-neutral-700 mb-4'>
								Nasz cel to być najszybszą i najbardziej przejrzystą platformą pożyczkową na rynku polskim. Chcemy, aby
								każdy nasz klient czuł się doceniony i bezpieczny.
							</p>
						</div>
						<div className='bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8 h-96 flex items-center justify-center'>
							<div className='text-6xl'>🚀</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className='py-12 section-container'>
				<h2 className='text-3xl font-bold text-neutral-900 mb-12 text-center'>Nasze wartości</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='bg-white p-8 rounded-lg shadow'>
						<h3 className='text-xl font-bold text-primary-700 mb-4'>Przejrzystość</h3>
						<p className='text-neutral-700'>
							Nie ma ukrytych opłat czy zaskoczęń. Wszystko jest jasne i czytelne od samego początku.
						</p>
					</div>
					<div className='bg-white p-8 rounded-lg shadow'>
						<h3 className='text-xl font-bold text-primary-700 mb-4'>Szybkość</h3>
						<p className='text-neutral-700'>
							Decyzja w 5 minut, pieniądze na koncie w 24 godziny. Bez czekania w kolejkach.
						</p>
					</div>
					<div className='bg-white p-8 rounded-lg shadow'>
						<h3 className='text-xl font-bold text-primary-700 mb-4'>Bezpieczeństwo</h3>
						<p className='text-neutral-700'>
							Twoje dane chronimy najnowocześniejszymi metodami szyfrowania i pełną RODO compliance.
						</p>
					</div>
				</div>
			</section>

			{/* Team */}
			<section className='bg-white py-12'>
				<div className='section-container'>
					<h2 className='text-3xl font-bold text-neutral-900 mb-12 text-center'>Nasz zespół</h2>
					<p className='text-center text-neutral-600 max-w-2xl mx-auto mb-12'>
						Zespół doświadczonych profesjonalistów z branży finansowej, technologii i customer service. Razem pracujemy
						na rzecz Twojego sukcesu finansowego.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[1, 2, 3].map(i => (
							<div key={i} className='bg-neutral-50 rounded-lg p-6 text-center'>
								<div className='w-24 h-24 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full mx-auto mb-4'></div>
								<h3 className='font-bold text-neutral-900 mb-1'>Imię Nazwisko</h3>
								<p className='text-primary-700 font-semibold text-sm mb-2'>Stanowisko</p>
								<p className='text-sm text-neutral-600'>
									Doświadczony profesjonalista z wieloletnim doświadczeniem w branży.
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
