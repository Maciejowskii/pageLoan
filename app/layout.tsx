// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { HeaderAdvanced } from '@/components/layout/HeaderAdvanced'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-heading',
})

export const metadata: Metadata = {
	title: 'Pożyczki - Pożyczka do 150 000 PLN',
	description: 'Szybka i bezpieczna pożyczka online bez papierów. Decyzja w 5 minut, pieniądze na koncie w 24 godziny.',
	keywords: 'pożyczka, pożyczka online, szybka pożyczka, pożyczka bez papierów',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pl'>
			<body className={`${inter.variable} ${poppins.variable} font-sans bg-neutral-50 text-neutral-900`}>
				<HeaderAdvanced />
				<main className='min-h-screen'>{children}</main>
				<CookieBanner />
				<Footer />
			</body>
		</html>
	)
}
