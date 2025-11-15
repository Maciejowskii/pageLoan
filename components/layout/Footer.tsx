import Link from 'next/link'

export function Footer() {
	return (
		<footer className='bg-neutral-900 text-neutral-300'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					{/* Company Info */}
					<div>
						<h3 className='text-white font-bold mb-4'>KubuśPożyczki</h3>
						<p className='text-sm'>Szybka i bezpieczna pożyczka online do 150 000 PLN.</p>
					</div>

					{/* Links */}
					<div>
						<h4 className='text-white font-semibold mb-4'>Nawigacja</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/jak-to-dziala' className='hover:text-white transition'>
									Jak to działa
								</Link>
							</li>
							<li>
								<Link href='/kalkulator' className='hover:text-white transition'>
									Kalkulator
								</Link>
							</li>
							<li>
								<Link href='/faq' className='hover:text-white transition'>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className='text-white font-semibold mb-4'>Dokumenty</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/regulamin' className='hover:text-white transition'>
									Regulamin
								</Link>
							</li>
							<li>
								<Link href='/polityka-prywatnosci' className='hover:text-white transition'>
									Polityka prywatności
								</Link>
							</li>
							<li>
								<Link href='/polityka-cookies' className='hover:text-white transition'>
									Polityka cookies
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='text-white font-semibold mb-4'>Kontakt</h4>
						<p className='text-sm mb-2'>Email: biuro@kubuspozyczki.pl </p>
						<p className='text-sm mb-2'>Telefon: +48 535 645 322</p>
						<p className='text-sm'>Dni robocze: 8-22</p>
					</div>
				</div>

				<div className='border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center'>
					<p className='text-sm text-neutral-400'>
						{new Date().getFullYear()} KubuśPożyczki. Wszelkie prawa zastrzeżone. Zrealizowane przez
						<a
							href='https://digitay.pl/'
							className='hover:underline'
							target='_blank'
							rel='noopener noreferrer'
							color='green'
						>
							Digitay
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
