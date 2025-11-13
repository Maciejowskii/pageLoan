import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Regulamin - KubuśPożyczki',
}

export default function RegulaminPage() {
	return (
		<main className='min-h-screen bg-neutral-50 py-12'>
			<div className='section-container max-w-3xl'>
				<h1 className='text-4xl font-bold text-neutral-900 mb-8'>Regulamin</h1>

				<div className='bg-white p-8 rounded-lg shadow-lg space-y-8 text-neutral-700 leading-relaxed'>
					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>1. Postanowienia ogólne</h2>
						<p>
							Niniejszy regulamin określa warunki korzystania z usług świadczonych przez KubuśPożyczki. Korzystając ze
							strony internetowej, akceptujesz wszystkie warunki zawarte w tym regulaminie.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>2. Definicje</h2>
						<ul className='list-disc list-inside space-y-2'>
							<li>
								<strong>Strona internetowa:</strong> serwis www.kubuspozyczki.pl
							</li>
							<li>
								<strong>Usługodawca:</strong> KubuśPożyczki Sp. z o.o.
							</li>
							<li>
								<strong>Użytkownik:</strong> osoba fizyczna korzystająca ze Strony
							</li>
							<li>
								<strong>Pożyczka:</strong> umowa pożyczki zawarta między Usługodawcą a Użytkownikiem
							</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>3. Warunki udzielenia pożyczki</h2>
						<p>Warunkami udzielenia pożyczki są:</p>
						<ul className='list-disc list-inside space-y-2 mt-3'>
							<li>Pełnoletniość (min. 18 lat)</li>
							<li>Pobyt na terenie Polski</li>
							<li>Zdolność do czynności prawnych</li>
							<li>Zdolność kredytowa potwierdzona przez BIK lub BIG</li>
							<li>Podanie prawidłowych danych osobowych</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>4. Ochrona danych osobowych</h2>
						<p>
							Twoje dane osobowe są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679
							z dnia 27 kwietnia 2016 r. (RODO). Pełne informacje o przetwarzaniu danych znajdziesz w Polityce
							prywatności.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>5. Prawo do odstąpienia</h2>
						<p>
							Masz prawo do odstąpienia od umowy pożyczki w ciągu 14 dni od jej zawarcia. Aby skorzystać z tego prawa,
							prześlij pisemne oświadczenie na adres: info@kubuspozyczki.pl
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>6. Odpowiedzialność</h2>
						<p>
							KubuśPożyczki nie ponosi odpowiedzialności za przerwę w dostępie do Strony z przyczyn technicznych lub sił
							wyższych. Użytkownik korzysta ze Strony na własne ryzyko.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>7. Zmiana regulaminu</h2>
						<p>
							KubuśPożyczki zastrzega sobie prawo do zmiany regulaminu. Zmiany wchodzą w życie z chwilą opublikowania na
							Stronie.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>8. Prawo właściwe</h2>
						<p>Umowę reguluje prawo polskie. Wszelkie spory rozstrzygane będą przez właściwe sądy w Polsce.</p>
					</section>

					<div className='bg-primary-50 p-4 rounded-lg border-l-4 border-primary-700 mt-8'>
						<p className='text-sm'>
							<strong>Data wejścia w życie:</strong> 1 stycznia 2024 r.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
