import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Polityka Cookies | KubuśPożyczki',
	description: 'Polityka plików cookies serwisu KubuśPożyczki',
}

export default function PolitykaCookies(): JSX.Element {
	return (
		<div className='min-h-screen bg-neutral-50'>
			<div className='section-container py-16'>
				<div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12'>
					<h1 className='text-4xl font-bold text-neutral-900 mb-8'>Polityka Plików Cookie</h1>

					<div className='prose prose-lg max-w-none space-y-6 text-neutral-700'>
						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>1. Informacje ogólne</h2>
							<p>
								Niniejsza Polityka Cookies określa zasady zapisywania i uzyskiwania dostępu do danych na urządzeniach
								użytkownika korzystającego z serwisu <strong>kubuspozyczki.pl</strong> za pomocą plików cookies.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>2. Administrator</h2>
							<p>
								Administratorem danych osobowych jest <strong>KubuśPożyczki</strong>, z siedzibą w Policach, adres: ul.
								Targowa 6 lok. 5, 72-010 Police, NIP: 8513315629, e-mail: biuro@kubuspozyczki.pl
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>3. Czym są pliki cookie?</h2>
							<p>
								Pliki cookie to małe pliki tekstowe zapisywane na urządzeniu użytkownika (komputerze, tablecie,
								smartfonie) podczas przeglądania stron internetowych. Cookies umożliwiają rozpoznanie urządzenia
								użytkownika i odpowiednie wyświetlenie strony internetowej dostosowanej do jego indywidualnych
								preferencji.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>4. Rodzaje plików cookie</h2>
							<p>Stosujemy następujące rodzaje plików cookie:</p>

							<h3 className='text-xl font-semibold text-neutral-800 mt-6 mb-3'>
								4.1. Pliki cookie niezbędne (wymagane)
							</h3>
							<p>
								Są niezbędne do prawidłowego funkcjonowania strony internetowej. Umożliwiają podstawowe funkcje, takie
								jak bezpieczne logowanie czy zapamiętywanie zgody na pliki cookie. Te pliki nie wymagają zgody
								użytkownika.
							</p>

							<h3 className='text-xl font-semibold text-neutral-800 mt-6 mb-3'>4.2. Pliki cookie analityczne</h3>
							<p>
								Pozwalają nam analizować sposób korzystania ze strony (np. za pomocą Google Analytics). Dzięki nim
								możemy poprawiać funkcjonalność i jakość naszych usług. Wymagają zgody użytkownika.
							</p>

							<h3 className='text-xl font-semibold text-neutral-800 mt-6 mb-3'>4.3. Pliki cookie marketingowe</h3>
							<p>
								Służą do wyświetlania spersonalizowanych reklam dostosowanych do zainteresowań użytkownika. Wymagają
								zgody użytkownika.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>5. Cele stosowania plików cookie</h2>
							<ul className='list-disc pl-6 space-y-2'>
								<li>Zapewnienie prawidłowego działania strony internetowej</li>
								<li>Zapamiętywanie preferencji użytkownika</li>
								<li>Analiza ruchu na stronie i statystyki odwiedzin</li>
								<li>Dostosowanie treści reklamowych do zainteresowań użytkownika</li>
								<li>Zapewnienie bezpieczeństwa korzystania z serwisu</li>
							</ul>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>6. Zarządzanie plikami cookie</h2>
							<p>
								Użytkownik może w dowolnym momencie zmienić ustawienia dotyczące plików cookie w swojej przeglądarce
								internetowej. Może zaakceptować lub odrzucić pliki cookie, a także usunąć już zapisane pliki.
							</p>
							<p className='mt-4'>Instrukcje zarządzania cookies w popularnych przeglądarkach:</p>
							<ul className='list-disc pl-6 space-y-2 mt-4'>
								<li>
									<strong>Google Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie
								</li>
								<li>
									<strong>Mozilla Firefox:</strong> Opcje → Prywatność i bezpieczeństwo → Ciasteczka i dane stron
								</li>
								<li>
									<strong>Safari:</strong> Preferencje → Prywatność → Pliki cookie i dane witryn
								</li>
								<li>
									<strong>Microsoft Edge:</strong> Ustawienia → Pliki cookie i uprawnienia witryny
								</li>
							</ul>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>7. Wycofanie zgody</h2>
							<p>
								Użytkownik może w każdej chwili wycofać zgodę na przetwarzanie plików cookie poprzez zmianę ustawień w
								przeglądarce lub usunięcie zapisanych plików cookie. Wycofanie zgody nie wpływa na zgodność z prawem
								przetwarzania, którego dokonano przed jej wycofaniem.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>8. Podmioty trzecie</h2>
							<p>Nasza strona może korzystać z usług podmiotów trzecich, takich jak:</p>
							<ul className='list-disc pl-6 space-y-2 mt-4'>
								<li>Google Analytics (analiza ruchu)</li>
								<li>Google Ads (reklamy)</li>
								<li>Facebook Pixel (remarketing)</li>
							</ul>
							<p className='mt-4'>
								Te podmioty mogą wykorzystywać własne pliki cookie. Szczegółowe informacje znajdują się w politykach
								prywatności tych podmiotów.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>9. Zmiany w polityce cookies</h2>
							<p>
								Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies. O wszelkich zmianach
								użytkownicy zostaną poinformowani poprzez komunikat na stronie głównej serwisu.
							</p>
						</section>

						<section>
							<h2 className='text-2xl font-bold text-neutral-900 mt-8 mb-4'>10. Kontakt</h2>
							<p>
								W przypadku pytań dotyczących Polityki Cookies prosimy o kontakt: <br />
								<strong>E-mail:</strong> biuro@kubuspozyczki.pl  <br />
								<strong>Adres:</strong> ul. Targowa 6 lok. 5, 72-010 Police
							</p>
						</section>

						<p className='text-sm text-neutral-500 mt-12 pt-6 border-t border-neutral-200'>
							Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
