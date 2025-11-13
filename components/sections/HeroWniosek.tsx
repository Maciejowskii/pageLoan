// components/sections/HeroWniosek.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Zap, Shield } from 'lucide-react'

export function HeroWniosek() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' },
		},
	}

	return (
		<section className='relative min-h-[600px] overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16'>
			{/* Animated background elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<motion.div
					animate={{
						y: [0, -20, 0],
						rotate: [0, 5, 0],
					}}
					transition={{ duration: 6, repeat: Infinity }}
					className='absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-300 to-accent-200 rounded-full opacity-20 blur-3xl'
				/>
				<motion.div
					animate={{
						y: [0, 20, 0],
						rotate: [0, -5, 0],
					}}
					transition={{ duration: 8, repeat: Infinity }}
					className='absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-tr from-accent-300 to-primary-200 rounded-full opacity-15 blur-3xl'
				/>
			</div>

			<div className='relative section-container'>
				<motion.div variants={containerVariants} initial='hidden' animate='visible' className='text-center space-y-8'>
					{/* Main heading */}
					<motion.div variants={itemVariants} className='space-y-4'>
						<motion.div
							animate={{ scale: [1, 1.05, 1] }}
							transition={{ duration: 3, repeat: Infinity }}
							className='inline-block bg-gradient-to-r from-primary-100 to-accent-100 text-transparent bg-clip-text px-6 py-2 rounded-full border border-primary-200'
						>
							⚡ Szybka finansowanie 24/7
						</motion.div>

						<h1 className='text-5xl md:text-7xl font-bold text-neutral-900 leading-tight'>
							Pożyczka
							<br />
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-accent-600 to-primary-600'>
								do 150 000 PLN
							</span>
						</h1>

						<p className='text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed'>
							Bez papierów, bez czekania. Decyzja w 5 minut, pieniądze na koncie w 24 godziny. Przejrzysty proces, zero
							ukrytych opłat.
						</p>
					</motion.div>

					{/* CTA Buttons */}
					<motion.div variants={itemVariants} className='flex flex-col sm:flex-row justify-center gap-4 pt-8'>
						<motion.button
							whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 102, 204, 0.4)' }}
							whileTap={{ scale: 0.98 }}
							className='px-8 py-4 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-bold rounded-xl hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2 text-lg'
						>
							Złóż wniosek teraz <ArrowRight className='w-5 h-5' />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
							className='px-8 py-4 border-2 border-primary-700 text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition duration-300 text-lg'
						>
							Sprawdź kwotę
						</motion.button>
					</motion.div>

					{/* Features */}
					<motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-12'>
						{[
							{ icon: Zap, label: '5 minut', desc: 'Szybka decyzja' },
							{ icon: TrendingUp, label: 'Do 150k', desc: 'Maksymalna kwota' },
							{ icon: Shield, label: '100%', desc: 'Bezpieczeństwo' },
						].map((feature, i) => (
							<motion.div
								key={i}
								whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
								className='bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-200 hover:border-primary-300 transition'
							>
								<feature.icon className='w-8 h-8 text-primary-700 mx-auto mb-3' />
								<p className='font-bold text-neutral-900'>{feature.label}</p>
								<p className='text-sm text-neutral-600'>{feature.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-700'
			>
				<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
				</svg>
			</motion.div>
		</section>
	)
}
