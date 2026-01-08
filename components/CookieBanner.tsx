'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export function CookieBanner(): JSX.Element {
	const [showBanner, setShowBanner] = useState<boolean>(false)

	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent')
		if (!consent) {
			setShowBanner(true)
		}
	}, [])

	const handleAccept = (): void => {
		localStorage.setItem('cookieConsent', 'accepted')
		setShowBanner(false)
		// Tutaj możesz włączyć Google Analytics, Facebook Pixel itp.
	}

	const handleDecline = (): void => {
		localStorage.setItem('cookieConsent', 'declined')
		setShowBanner(false)
	}

	return (
		<AnimatePresence>
			{showBanner && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					className='fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-primary-700 shadow-2xl'
				>
					<div className='section-container'>
						<div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
							<div className='flex items-start gap-3 flex-1'>
								<Cookie className='w-6 h-6 text-primary-700 flex-shrink-0 mt-1' />
								<div>
									<h3 className='font-bold text-lg text-neutral-900 mb-1'>Ta strona używa plików cookie</h3>
									<p className='text-sm text-neutral-600'>
										Używamy plików cookie, aby zapewnić prawidłowe działanie strony oraz analizować ruch. Możesz
										zaakceptować wszystkie pliki cookie lub tylko niezbędne.{' '}
										<Link href='/polityka-cookies' className='text-primary-700 underline font-semibold'>
											Dowiedz się więcej
										</Link>
									</p>
								</div>
							</div>

							<div className='flex flex-col sm:flex-row gap-2 w-full md:w-auto'>
								<button
									onClick={handleAccept}
									className='px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 whitespace-nowrap'
								>
									Akceptuję wszystkie
								</button>
								<button
									onClick={handleDecline}
									className='px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition duration-300 whitespace-nowrap'
								>
									Tylko niezbędne
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
