// app/(pages)/polityka-prywatnosci/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Polityka prywatności - KubuśPożyczki',
}

export default function PolitykaPrywatosciPage() {
	return (
		<main className='min-h-screen bg-neutral-50 py-12'>
			<div className='section-container max-w-3xl'>
				<h1 className='text-4xl font-bold text-neutral-900 mb-8'>Polityka prywatności</h1>

				<div className='bg-white p-8 rounded-lg shadow-lg space-y-8 text-neutral-700 leading-relaxed'>
					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>1. Administrator danych</h2>
						<p>
							Administratorem Twoich danych osobowych jest: KubuśPożyczki Sp. z o.o., ul. Targowa 6 lok. 5, 72-010
							Police, NIP: 8513315629
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>2. Rodzaje przetwarzanych danych</h2>
						<p>Przetwarzamy następujące dane osobowe:</p>
						<ul className='list-disc list-inside space-y-2 mt-3'>
							<li>Imię i nazwisko</li>
							<li>Numer PESEL</li>
							<li>Adres email</li>
							<li>Numer telefonu</li>
							<li>Dane finansowe (dochód, zatrudnienie)</li>
							<li>Historia kredytowa</li>
							<li>Dane bankowe</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>3. Cel przetwarzania danych</h2>
						<p>Twoje dane są przetwarzane w celu:</p>
						<ul className='list-disc list-inside space-y-2 mt-3'>
							<li>Weryfikacji tożsamości</li>
							<li>Oceny zdolności kredytowej</li>
							<li>Zawarcia i realizacji umowy pożyczki</li>
							<li>Komunikacji z Tobą</li>
							<li>Zapobiegania oszustwom</li>
							<li>Wypełnienia obowiązków prawnych</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>4. Twoje prawa</h2>
						<p>Masz prawo do:</p>
						<ul className='list-disc list-inside space-y-2 mt-3'>
							<li>Dostępu do swoich danych</li>
							<li>Sprostowania danych</li>
							<li>Usunięcia danych (prawo do bycia zapomnianym)</li>
							<li>Ograniczenia przetwarzania</li>
							<li>Przenoszenia danych</li>
							<li>Sprzeciwu wobec przetwarzania</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>5. Cookies</h2>
						<p>
							Strona używa cookies do poprawy doświadczenia użytkownika. Akceptując warunki, zgadzasz się na używanie
							cookies. Możesz je wyłączyć w ustawieniach przeglądarki.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-primary-700 mb-4'>6. Bezpieczeństwo danych</h2>
						<p>
							Twoje dane są chroniące zaawansowanymi technikami szyfrowania (SSL/TLS) i przechowywane na bezpiecznych
							serwerach.
						</p>
					</section>

					<div className='bg-primary-50 p-4 rounded-lg border-l-4 border-primary-700 mt-8'>
						<p className='text-sm'>
							<strong>Pytania dotyczące prywatności?</strong> Skontaktuj się z nami: biuro@kubuspozyczki.pl 
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
