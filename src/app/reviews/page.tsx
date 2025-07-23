'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

// Function to create staggered layout (3-4-3-4)
const createStaggeredRows = (totalReviews: number) => {
	const rows = []
	let reviewIndex = 1
	let rowIndex = 0

	while (reviewIndex <= totalReviews) {
		const reviewsInRow = rowIndex % 2 === 0 ? 3 : 4 // 3 for even rows, 4 for odd rows
		const row = []

		for (let i = 0; i < reviewsInRow && reviewIndex <= totalReviews; i++) {
			row.push(reviewIndex)
			reviewIndex++
		}

		if (row.length > 0) {
			rows.push(row)
		}
		rowIndex++
	}

	return rows
}

export default function Reviews() {
	const [selectedReview, setSelectedReview] = useState<number | null>(null)
	const totalReviews = 10
	const staggeredRows = createStaggeredRows(totalReviews)

	return (
		<div
			className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-x-hidden relative'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
			}}
		>
			{/* Background decorative elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{/* Subtle gradient orbs */}
				<div className='absolute top-0 left-0 w-96 h-96 opacity-8'>
					<div className='w-full h-full bg-gradient-radial from-purple-500/15 via-blue-500/8 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute top-1/3 right-0 w-80 h-80 opacity-6'>
					<div className='w-full h-full bg-gradient-radial from-emerald-500/12 via-teal-500/6 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute bottom-0 left-1/3 w-72 h-72 opacity-6'>
					<div className='w-full h-full bg-gradient-radial from-rose-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute bottom-1/4 right-1/4 w-64 h-64 opacity-5'>
					<div className='w-full h-full bg-gradient-radial from-violet-500/8 via-indigo-500/4 to-transparent rounded-full blur-3xl'></div>
				</div>

				{/* Mesh pattern overlay */}
				<div
					className='absolute inset-0 opacity-[0.02]'
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
						backgroundSize: '48px 48px',
					}}
				></div>

				{/* Subtle geometric shapes */}
				<div className='absolute top-20 left-20 w-32 h-32 opacity-5'>
					<div className='w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl'></div>
				</div>
				<div className='absolute bottom-32 right-20 w-24 h-24 opacity-5'>
					<div className='w-full h-full bg-gradient-to-tl from-white/8 to-white/4 rounded-lg rotate-45 blur-xl'></div>
				</div>
			</div>

			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='relative z-10 container mx-auto px-4 md:px-6 text-center max-w-4xl'>
					<motion.h1
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-4xl md:text-6xl lg:text-7xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'
					>
						Отзывы клиентов
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Мнения тех, кто уже доверил нам создание своего идеального интерьера
					</motion.p>
					<motion.h2
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.4 }}
						className='text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto font-light'
					>
						Каждый отзыв — это история успешного проекта и довольного клиента
					</motion.h2>
				</div>
			</section>

			{/* Reviews Gallery */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						variants={stagger}
						initial='initial'
						animate='animate'
						className='space-y-6 md:space-y-8'
					>
						{staggeredRows.map((row, rowIndex) => (
							<motion.div
								key={rowIndex}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
								className={`grid gap-4 md:gap-6 ${
									row.length === 3
										? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
										: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
								}`}
							>
								{row.map(reviewNumber => (
									<motion.div
										key={reviewNumber}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.5,
											delay: rowIndex * 0.1 + reviewNumber * 0.05,
										}}
										whileHover={{ y: -8, scale: 1.02 }}
										onClick={() => setSelectedReview(reviewNumber)}
										className='relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group'
									>
										<Image
											src={`/assets/reviews/${reviewNumber}.jpg`}
											alt={`Отзыв клиента ${reviewNumber}`}
											width={1107}
											height={1500}
											className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl md:rounded-3xl'
										/>

										{/* Hover overlay */}
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl md:rounded-3xl'>
											<div className='absolute bottom-6 left-6 right-6'>
												<div className='bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20'>
													<p className='text-white text-sm font-medium'>
														Нажмите для увеличения
													</p>
												</div>
											</div>
										</div>

										{/* Review number badge */}
										<div className='absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30'>
											<span className='text-white text-xs font-medium'>
												#{reviewNumber}
											</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Modal for full-size review */}
			{selectedReview && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4'
					onClick={() => setSelectedReview(null)}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
						className='relative max-w-4xl max-h-[90vh] overflow-auto'
						onClick={e => e.stopPropagation()}
					>
						<Image
							src={`/assets/reviews/${selectedReview}.jpg`}
							alt={`Отзыв клиента ${selectedReview}`}
							width={1107}
							height={1500}
							className='w-full h-auto object-contain rounded-2xl'
						/>

						{/* Close button */}
						<button
							onClick={() => setSelectedReview(null)}
							className='absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all'
						>
							<span className='text-xl'>×</span>
						</button>

						{/* Review info */}
						<div className='absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20'>
							<span className='text-white text-sm font-medium'>
								Отзыв #{selectedReview}
							</span>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* CTA Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-800/50 via-slate-800/30 to-gray-900/50' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center max-w-4xl mx-auto'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Станьте нашим следующим довольным клиентом
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Присоединяйтесь к сотням клиентов, которые уже получили интерьер
							своей мечты
						</p>

						<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
							<motion.a
								href='/contact'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center'
							>
								Начать проект
							</motion.a>
							<motion.a
								href='/contact'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-white/10 backdrop-blur-xl text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto text-center'
							>
								Обсудить проект
							</motion.a>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
