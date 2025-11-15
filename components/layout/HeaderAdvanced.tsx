'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function HeaderAdvanced() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const links = [
		{ href: '/jak-to-dziala', label: 'Jak to działa' },
		{ href: '/kalkulator', label: 'Kalkulator' },
		{ href: '/wniosek', label: 'Złóż Wniosek' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/kontakt', label: 'Kontakt' },
	]

	return (
		<motion.header
			animate={{
				boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
				backgroundColor: scrolled ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.8)',
			}}
			className='sticky top-0 z-50 backdrop-blur-xl border-b border-neutral-200/50 transition-all duration-300'
		>
			<div className='section-container'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link href='/' className='flex items-center gap-2 group'>
							<motion.div
								animate={{ rotate: [0, 360] }}
								transition={{ duration: 20, repeat: Infinity }}
								className='w-10 h-10 bg-gradient-to-br from-primary-700 to-accent-600 rounded-lg flex items-center justify-center shadow-lg'
							>
								<span className='text-white font-bold text-lg'>KP</span>
							</motion.div>
							<span className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-accent-600 hidden sm:inline group-hover:scale-105 transition-transform'>
								KubuśPożyczki
							</span>
						</Link>
					</motion.div>

					{/* Desktop Menu */}
					<nav className='hidden md:flex gap-1'>
						{links.map(link => (
							<motion.div key={link.href} whileHover={{ y: -2 }}>
								<Link
									href={link.href}
									className='px-3 py-2 text-sm font-semibold text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition duration-200'
								>
									{link.label}
								</Link>
							</motion.div>
						))}
					</nav>

					{/* CTA Button */}
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='hidden sm:block'>
						<Link
							href='/wniosek'
							className='px-6 py-2 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 btn-shimmer'
						>
							Złóż wniosek
						</Link>
					</motion.div>

					{/* Mobile Menu Button */}
					<motion.button
						onClick={() => setIsOpen(!isOpen)}
						whileTap={{ scale: 0.95 }}
						className='md:hidden p-2 hover:bg-neutral-100 rounded-lg transition'
					>
						<AnimatePresence mode='wait'>
							{isOpen ? (
								<motion.div key='close' initial={{ rotate: 0 }} animate={{ rotate: 90 }} exit={{ rotate: 0 }}>
									<X size={24} />
								</motion.div>
							) : (
								<motion.div key='menu' initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
									<Menu size={24} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.nav
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='md:hidden border-t border-neutral-200 pb-4 space-y-2'
						>
							{links.map((link, i) => (
								<motion.div
									key={link.href}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1 }}
								>
									<Link
										href={link.href}
										className='block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition'
										onClick={() => setIsOpen(false)}
									>
										{link.label}
									</Link>
								</motion.div>
							))}
							<Link
								href='/wniosek'
								className='block w-full px-4 py-2 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition text-center mt-4'
								onClick={() => setIsOpen(false)}
							>
								Złóż wniosek
							</Link>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	)
}
