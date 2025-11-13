'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from 'recharts'
import { TrendingDown, DollarSign, Calendar } from 'lucide-react'

export function LoanCalculatorAdvanced() {
	const [amount, setAmount] = useState(50000)
	const [period, setPeriod] = useState(24)
	const [rate] = useState(5.5)
	type PaymentScheduleEntry = {
		month: number
		interest: number
		principal: number
		remaining: number
	}

	const monthlyRate = rate / 100 / 12
	const numPayments = period

	let monthlyPayment = 0
	let totalPayment = 0
	let totalInterest = 0
	let paymentSchedule: PaymentScheduleEntry[] = []

	if (monthlyRate === 0) {
		monthlyPayment = amount / numPayments
		totalPayment = amount
		totalInterest = 0
	} else {
		const emi =
			(amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

		monthlyPayment = emi
		totalPayment = emi * numPayments
		totalInterest = totalPayment - amount
	}

	// Generate payment schedule for chart
	{
		const schedule: PaymentScheduleEntry[] = []
		let remaining = amount
		for (let i = 1; i <= Math.min(period, 12); i++) {
			const interestPayment = remaining * monthlyRate
			const principalPayment = monthlyPayment - interestPayment
			remaining -= principalPayment
			schedule.push({
				month: i,
				interest: Math.round(interestPayment),
				principal: Math.round(principalPayment),
				remaining: Math.round(Math.max(0, remaining)),
			})
		}
		paymentSchedule = schedule
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pl-PL', {
			style: 'currency',
			currency: 'PLN',
			minimumFractionDigits: 0,
		}).format(value)
	}

	const pieData = [
		{ name: 'Kapitał', value: Math.round(amount) },
		{ name: 'Odsetki', value: Math.round(totalInterest) },
	]
	const COLORS = ['#0066cc', '#00a9e0']

	return (
		<div className='max-w-6xl mx-auto'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Left side: Input Controls */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className='bg-white rounded-2xl shadow-xl p-8'
				>
					<h3 className='text-2xl font-bold text-neutral-900 mb-8'>Konfiguruj pożyczkę</h3>

					<div className='space-y-8'>
						{/* Amount Slider */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-xl'
						>
							<div className='flex justify-between items-center mb-4'>
								<label className='text-lg font-bold text-neutral-900 flex items-center gap-2'>
									<DollarSign className='w-5 h-5 text-primary-700' />
									Kwota pożyczki
								</label>
								<motion.span
									animate={{ scale: [1, 1.1, 1] }}
									transition={{ duration: 2, repeat: Infinity }}
									className='text-3xl font-bold text-primary-700'
								>
									{formatCurrency(amount)}
								</motion.span>
							</div>
							<input
								type='range'
								min='500'
								max='150000'
								step='1000'
								value={amount}
								onChange={e => setAmount(Number(e.target.value))}
								className='w-full h-3 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-primary-700'
							/>
							<div className='flex justify-between text-xs text-neutral-600 mt-3 font-semibold'>
								<span>500 zł</span>
								<span>150 000 zł</span>
							</div>
						</motion.div>

						{/* Period Slider */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='bg-gradient-to-br from-accent-50 to-primary-50 p-6 rounded-xl'
						>
							<div className='flex justify-between items-center mb-4'>
								<label className='text-lg font-bold text-neutral-900 flex items-center gap-2'>
									<Calendar className='w-5 h-5 text-accent-600' />
									Okres spłaty
								</label>
								<motion.span
									animate={{ scale: [1, 1.1, 1] }}
									transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
									className='text-3xl font-bold text-accent-600'
								>
									{period} m-cy
								</motion.span>
							</div>
							<input
								type='range'
								min='3'
								max='60'
								step='1'
								value={period}
								onChange={e => setPeriod(Number(e.target.value))}
								className='w-full h-3 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-accent-600'
							/>
							<div className='flex justify-between text-xs text-neutral-600 mt-3 font-semibold'>
								<span>3 m-ce</span>
								<span>60 m-cy</span>
							</div>
						</motion.div>

						{/* Results Cards */}
						<div className='space-y-4'>
							<motion.div
								whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 102, 204, 0.2)' }}
								className='bg-gradient-to-r from-primary-700 to-primary-800 p-6 rounded-xl text-white'
							>
								<p className='text-primary-100 text-sm font-semibold mb-2'>Rata miesięczna</p>
								<p className='text-4xl font-bold'>{formatCurrency(monthlyPayment)}</p>
							</motion.div>

							<div className='grid grid-cols-2 gap-4'>
								<motion.div
									whileHover={{ y: -5 }}
									className='bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200'
								>
									<p className='text-green-700 text-xs font-semibold mb-1'>Całkowite odsetki</p>
									<p className='text-2xl font-bold text-green-600'>{formatCurrency(totalInterest)}</p>
								</motion.div>

								<motion.div
									whileHover={{ y: -5 }}
									className='bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200'
								>
									<p className='text-blue-700 text-xs font-semibold mb-1'>Do spłaty razem</p>
									<p className='text-2xl font-bold text-blue-600'>{formatCurrency(totalPayment)}</p>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Right side: Charts */}
				<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className='space-y-8'>
					{/* Payment Schedule Chart */}
					<motion.div
						whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
						className='bg-white rounded-2xl shadow-xl p-8'
					>
						<h4 className='font-bold text-neutral-900 mb-4 flex items-center gap-2'>
							<TrendingDown className='w-5 h-5 text-primary-700' />
							Harmonogram płatności (12 miesięcy)
						</h4>
						<ResponsiveContainer width='100%' height={300}>
							<LineChart data={paymentSchedule}>
								<CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
								<XAxis dataKey='month' />
								<YAxis />
								<Tooltip
									contentStyle={{
										backgroundColor: 'rgba(255,255,255,0.95)',
										border: '2px solid #0066cc',
										borderRadius: '8px',
									}}
								/>
								<Line
									type='monotone'
									dataKey='remaining'
									stroke='#0066cc'
									strokeWidth={3}
									dot={{ fill: '#0066cc', r: 5 }}
									name='Pozostało do spłaty'
								/>
							</LineChart>
						</ResponsiveContainer>
					</motion.div>

					{/* Pie Chart */}
					<motion.div
						whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
						className='bg-white rounded-2xl shadow-xl p-8'
					>
						<h4 className='font-bold text-neutral-900 mb-4'>Struktura całkowitej kwoty</h4>
						<ResponsiveContainer width='100%' height={250}>
							<PieChart>
								<Pie
									data={pieData}
									cx='50%'
									cy='50%'
									labelLine={false}
									label={({ name, value, percent }) => `${name}: ${formatCurrency(value)}`}
									outerRadius={80}
									fill='#8884d8'
									dataKey='value'
								>
									{COLORS.map((color, index) => (
										<Cell key={`cell-${index}`} fill={color} />
									))}
								</Pie>
								<Tooltip formatter={value => formatCurrency(value as number)} />
							</PieChart>
						</ResponsiveContainer>
					</motion.div>
				</motion.div>
			</div>

			{/* Disclaimer */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className='mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg'
			>
				<p className='text-blue-900 font-semibold'>ℹ️ Ważne:</p>
				<p className='text-blue-700 text-sm mt-2'>
					Podane kwoty są orientacyjne i mogą się różnić od ostatecznych warunków. Rzeczywista stopa procentowa zależy
					od Twojego profilu kredytowego.
				</p>
			</motion.div>
		</div>
	)
}
