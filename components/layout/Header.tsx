'use client'

import Link from 'next/link'
import { useState } from 'react'

const Menu = ({ size = 24 }: { size?: number }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		<path d='M3 6h18' />
		<path d='M3 12h18' />
		<path d='M3 18h18' />
	</svg>
)

const X = ({ size = 24 }: { size?: number }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		<path d='M18 6L6 18' />
		<path d='M6 6l12 12' />
	</svg>
)

export function Header() {
	const [isOpen, setIsOpen] = useState(false)

	const links = [
		{ href: '/o-nas', label: 'O nas' },
		{ href: '/jak-to-dziala', label: 'Jak to działa' },
		{ href: '/kalkulator', label: 'Kalkulator' },
		{ href: '/oferta', label: 'Oferta' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/kontakt', label: 'Kontakt' },
	]

	return (
		<header className='sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link href='/' className='flex items-center gap-2'>
						<div className='w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-lg'>MP</span>
						</div>
						<span className='text-xl font-bold text-primary-800 hidden sm:inline'>KubuśPożyczki</span>
					</Link>

					{/* Desktop Menu */}
					<nav className='hidden md:flex gap-1'>
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className='px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition'
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* CTA Button */}
					<Link
						href='/wniosek'
						className='hidden sm:inline-block px-6 py-2 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition'
					>
						Złóż wniosek
					</Link>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='md:hidden p-2 hover:bg-neutral-100 rounded-lg transition'
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<nav className='md:hidden pb-4 space-y-2'>
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className='block px-4 py-2 text-neutral-700 hover:bg-primary-50 rounded-md transition'
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<Link
							href='/wniosek'
							className='block w-full px-4 py-2 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition text-center'
							onClick={() => setIsOpen(false)}
						>
							Złóż wniosek
						</Link>
					</nav>
				)}
			</div>
		</header>
	)
}
