'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LoanCalculator() {
	const [amount, setAmount] = useState(50000)
	const [period, setPeriod] = useState(24)
	const [rate] = useState(5.5) // Stała stopa procentowa
	// Obliczenia bezpośrednio w renderze, bez useState/useEffect
	const monthlyRate = rate / 100 / 12
	const numPayments = period

	let monthlyPayment = 0
	let totalPayment = 0
	let totalInterest = 0

	if (monthlyRate === 0) {
		monthlyPayment = amount / numPayments
		totalPayment = amount
		totalInterest = 0
	} else {
		monthlyPayment =
			(amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
		totalPayment = monthlyPayment * numPayments
		totalInterest = totalPayment - amount
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pl-PL', {
			style: 'currency',
			currency: 'PLN',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	return (
		<div className='max-w-4xl mx-auto'>
			<div className='bg-white rounded-lg shadow-lg p-8 md:p-12'>
				{/* Sliders */}
				<div className='space-y-8'>
					{/* Kwota */}
					<div>
						<div className='flex justify-between items-center mb-4'>
							<label className='text-lg font-semibold text-neutral-900'>Kwota pożyczki</label>
							<span className='text-2xl font-bold text-primary-700'>{formatCurrency(amount)}</span>
						</div>
						<input
							type='range'
							min='500'
							max='150000'
							step='1000'
							value={amount}
							onChange={e => setAmount(Number(e.target.value))}
							className='w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-700'
						/>
						<div className='flex justify-between text-xs text-neutral-500 mt-2'>
							<span>500 zł</span>
							<span>150 000 zł</span>
						</div>
					</div>

					{/* Okres */}
					<div>
						<div className='flex justify-between items-center mb-4'>
							<label className='text-lg font-semibold text-neutral-900'>Okres spłaty</label>
							<span className='text-2xl font-bold text-primary-700'>{period} miesięcy</span>
						</div>
						<input
							type='range'
							min='3'
							max='60'
							step='1'
							value={period}
							onChange={e => setPeriod(Number(e.target.value))}
							className='w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-700'
						/>
						<div className='flex justify-between text-xs text-neutral-500 mt-2'>
							<span>3 miesiące</span>
							<span>60 miesięcy</span>
						</div>
					</div>

					{/* Stopa procentowa */}
					<div className='bg-primary-50 p-4 rounded-lg'>
						<div className='flex justify-between items-center'>
							<label className='text-lg font-semibold text-neutral-900'>Oprocentowanie</label>
							<span className='text-2xl font-bold text-primary-700'>{rate.toFixed(2)}%</span>
						</div>
						<p className='text-sm text-neutral-600 mt-2'>Oprocentowanie zmienne uzależnione od historii kredytowej</p>
					</div>
				</div>

				{/* Results */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t-2 border-neutral-200'>
					<div className='bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg'>
						<p className='text-sm text-neutral-600 font-medium mb-2'>Rata miesięczna</p>
						<p className='text-3xl font-bold text-primary-700'>{formatCurrency(monthlyPayment)}</p>
					</div>
					<div className='bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-lg'>
						<p className='text-sm text-neutral-600 font-medium mb-2'>Całkowite odsetki</p>
						<p className='text-3xl font-bold text-accent-600'>{formatCurrency(totalInterest)}</p>
					</div>
					<div className='bg-gradient-to-br from-neutral-100 to-neutral-200 p-6 rounded-lg'>
						<p className='text-sm text-neutral-600 font-medium mb-2'>Do spłaty razem</p>
						<p className='text-3xl font-bold text-neutral-900'>{formatCurrency(totalPayment)}</p>
					</div>
				</div>

				{/* Info text */}
				<div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
					<p className='text-sm text-blue-900'>
						ℹ️ <strong>Podane kwoty są orientacyjne.</strong> Rzeczywista stopa procentowa i ostateczne warunki zależą
						od Twojego profilu kredytowego i oceny zdolności kredytowej.
					</p>
				</div>

				{/* CTA */}
				<Link href='/wniosek' className='block mt-8 btn-primary text-center flex items-center justify-center gap-2'>
					Złóż wniosek teraz <ArrowRight className='w-5 h-5' />
				</Link>
			</div>
		</div>
	)
}
