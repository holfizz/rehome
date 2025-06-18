'use client'

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Home() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	// Параллакс эффекты
	const scrollY = useMotionValue(0)
	const scrollParallax = useTransform(scrollY, [0, 1000], [0, -200])

	useEffect(() => {
		const handleScroll = () => {
			scrollY.set(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			{/* Liquid Glass Header */}
			<motion.header
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
				className='fixed top-4 left-4 right-4 z-50 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/10 before:opacity-50'
			>
				<div className='flex items-center justify-between px-8 md:px-12 py-4 md:py-5 relative z-10'>
					<motion.div
						whileHover={{ scale: 1.02 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
						className='flex items-center space-x-4'
					>
						<div className='w-10 h-10 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]'>
							<span className='text-white font-light text-lg'>R</span>
						</div>
						<span className='text-2xl md:text-3xl font-extralight tracking-[0.02em] text-white/95'>
							REHOME
						</span>
					</motion.div>

					<nav className='hidden md:flex items-center space-x-8'>
						<motion.a
							href='#'
							whileHover={{ y: -1 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='text-sm font-light text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full'
						>
							Портфолио
						</motion.a>
						<motion.a
							href='#'
							whileHover={{ y: -1 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='text-sm font-light text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full'
						>
							Услуги
						</motion.a>
						<motion.a
							href='#'
							whileHover={{ y: -1 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='text-sm font-light text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full'
						>
							Контакты
						</motion.a>
					</nav>

					<div className='flex items-center space-x-4'>
						<motion.button
							whileHover={{ scale: 1.02, y: -1 }}
							whileTap={{ scale: 0.98 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='hidden md:block bg-white/15 backdrop-blur-xl text-white px-6 py-2.5 rounded-full text-sm font-light border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
						>
							Обсудить
						</motion.button>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className='md:hidden p-3'
						>
							<div className='w-7 h-7 flex flex-col justify-between'>
								<span
									className={`w-full h-0.5 bg-white transition-all ${
										isMobileMenuOpen ? 'rotate-45 translate-y-3' : ''
									}`}
								></span>
								<span
									className={`w-full h-0.5 bg-white transition-all ${
										isMobileMenuOpen ? 'opacity-0' : ''
									}`}
								></span>
								<span
									className={`w-full h-0.5 bg-white transition-all ${
										isMobileMenuOpen ? '-rotate-45 -translate-y-3' : ''
									}`}
								></span>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='md:hidden border-t border-white/10 px-8 py-6'
					>
						<div className='flex flex-col space-y-6'>
							<a
								href='#'
								className='text-lg hover:text-gray-300 transition-colors'
							>
								Портфолио
							</a>
							<a
								href='#'
								className='text-lg hover:text-gray-300 transition-colors'
							>
								Услуги
							</a>
							<a
								href='#'
								className='text-lg hover:text-gray-300 transition-colors'
							>
								Контакты
							</a>
							<button className='bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all text-left'>
								Обсудить
							</button>
						</div>
					</motion.div>
				)}
			</motion.header>

			<section className='relative h-screen flex items-center justify-center overflow-hidden'>
				<div className='absolute inset-0'>
					<motion.div
						initial={{ opacity: 0, scale: 1.05 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
						className='relative w-full h-full'
					>
						<Image
							src='https://images.unsplash.com/photo-1672137233327-37b0c1049e77'
							alt='Luxury Interior Design'
							fill
							className='object-cover scale-110'
							priority
						/>
					</motion.div>
				</div>

				{/* Liquid Glass Overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-10' />

				{/* Main Content Glass Container */}
				<motion.div
					initial={{ opacity: 0, y: 60, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{
						duration: 1.5,
						delay: 0.3,
						ease: [0.25, 0.46, 0.45, 0.94],
					}}
					className='relative z-20 text-center max-w-5xl mx-auto px-8'
				>
					{/* Glass Card Container */}
					<motion.div
						style={{ y: scrollParallax }}
						className='bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] p-12 md:p-16 lg:p-20 relative overflow-hidden'
					>
						{/* Inner Glass Reflection */}
						<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[3rem] pointer-events-none' />

						{/* Content */}
						<div className='relative z-10'>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className='mb-6'
							>
								<span className='text-xs md:text-sm text-white/70 font-light tracking-[0.2em] uppercase'>
									Студия дизайна интерьеров
								</span>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: 1 }}
								className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin mb-8 tracking-[-0.02em] leading-[0.9] text-white'
								style={{
									textShadow:
										'0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)',
								}}
							>
								REHOME
							</motion.h1>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1.3 }}
								className='mb-12'
							>
								<h2 className='text-lg md:text-xl lg:text-2xl text-white/90 mb-4 font-light max-w-3xl mx-auto leading-relaxed'>
									Создаем пространства, которые вдохновляют жить
								</h2>
								<p className='text-sm md:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed'>
									Превращаем ваши идеи в реальность с помощью продуманного
									дизайна
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1.6 }}
								className='flex flex-col sm:flex-row gap-4 justify-center items-center'
							>
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='bg-white/20 backdrop-blur-xl text-white px-8 py-3 rounded-full text-sm font-light border border-white/30 hover:bg-white/25 hover:border-white/40 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] relative overflow-hidden group'
								>
									<span className='relative z-10'>Начать проект</span>
									<div className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='border border-white/40 text-white/90 px-8 py-3 rounded-full text-sm font-light hover:bg-white/10 hover:border-white/50 backdrop-blur-xl transition-all relative overflow-hidden group'
								>
									<span className='relative z-10'>Посмотреть работы</span>
									<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
								</motion.button>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>

				{/* Ambient Light Effects */}
				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000' />
			</section>

			{/* Liquid Glass Services and Pricing */}
			<motion.section
				ref={ref}
				initial='initial'
				animate={isInView ? 'animate' : 'initial'}
				variants={stagger}
				className='py-20 md:py-40 bg-gradient-to-br from-black via-amber-950 to-black flex items-center justify-center relative overflow-hidden'
			>
				{/* Background Glass Elements */}
				<div className='absolute top-20 left-10 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-20 right-10 w-80 h-80 bg-amber-800/5 rounded-full blur-3xl animate-pulse delay-1000' />
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl animate-pulse delay-500' />
				<div className='container mx-auto px-6 max-w-7xl relative z-10'>
					<motion.div
						variants={fadeInUp}
						className='text-center mb-20 md:mb-32'
					>
						<h2 className='text-5xl md:text-7xl lg:text-8xl font-thin mb-8 tracking-tighter text-gray-200'>
							УСЛУГИ И ЦЕНЫ
						</h2>
						<p className='text-white/70 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed'>
							Мы предоставляем комплексные услуги по дизайну интерьера — от
							консультаций до реализации дизайн-проекта «под ключ»
						</p>
					</motion.div>

					<motion.div
						variants={scaleIn}
						className='bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/20 p-12 md:p-20 overflow-x-auto shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative'
					>
						{/* Inner Glass Reflection */}
						<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[4rem] pointer-events-none' />
						<div className='min-w-[1000px]'>
							{/* Header Row */}
							<div className='grid grid-cols-4 gap-10 mb-20'>
								<div className='p-8'></div>

								{/* Package 1 - Концепт */}
								<div className='text-center p-12 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group'>
									<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.5rem] pointer-events-none' />
									<div className='w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg border border-white/30 relative z-10'>
										<svg
											className='w-8 h-8 text-white'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
										</svg>
									</div>
									<h3 className='text-2xl font-semibold mb-3 text-white relative z-10'>
										Концепт
									</h3>
									<p className='text-white/70 text-sm mb-8 leading-relaxed relative z-10'>
										Планировочное решение, 3D-визуализация, подбор мебели
									</p>
									<div className='text-white mb-8 relative z-10'>
										<span className='text-5xl font-light tracking-tight'>
											2 500
										</span>
										<span className='text-xl text-white/70'> ₽/м²</span>
									</div>
									<div className='text-white/80 text-sm bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full font-medium border border-white/20 relative z-10'>
										до 20 дней
									</div>
								</div>

								{/* Package 2 - Popular */}
								<div className='text-center p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2.5rem] border-2 border-gray-400 relative shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform'>
									<div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-black text-white px-8 py-3 rounded-full text-xs font-semibold tracking-wide shadow-lg'>
										ПОПУЛЯРНЫЙ ВЫБОР
									</div>
									<div className='w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg'>
										<svg
											className='w-8 h-8 text-white'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
										</svg>
									</div>
									<h3 className='text-2xl font-semibold mb-3 text-gray-800'>
										Стандарт
									</h3>
									<p className='text-gray-700 text-sm mb-8 leading-relaxed font-medium'>
										Всё из &ldquo;Концепт&rdquo; + техническая документация,
										эргономичная планировка
									</p>
									<div className='text-gray-900 mb-8'>
										<span className='text-5xl font-light tracking-tight'>
											4 000
										</span>
										<span className='text-xl text-gray-700'> ₽/м²</span>
									</div>
									<div className='text-gray-700 text-sm bg-white/80 px-8 py-4 rounded-full font-medium border border-gray-300'>
										до 30 дней
									</div>
								</div>

								{/* Package 3 */}
								<div className='text-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2.5rem] border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
									<div className='w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg'>
										<svg
											className='w-8 h-8 text-white'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
										</svg>
									</div>
									<h3 className='text-2xl font-semibold mb-3 text-gray-800'>
										Под ключ
									</h3>
									<p className='text-gray-600 text-sm mb-8 leading-relaxed'>
										Всё из &ldquo;Стандарт&rdquo; + авторский надзор, полная
										комплектация
									</p>
									<div className='text-gray-900 mb-8'>
										<span className='text-5xl font-light tracking-tight'>
											6 500
										</span>
										<span className='text-xl text-gray-600'> ₽/м²</span>
									</div>
									<div className='text-gray-600 text-sm bg-white/70 px-8 py-4 rounded-full font-medium border border-gray-200'>
										до 45 дней
									</div>
								</div>
							</div>

							{/* Service Rows */}
							<div className='space-y-0 rounded-[2.5rem] overflow-hidden border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/50 shadow-inner'>
								{[
									{
										name: 'Выезд дизайнера и замер объекта',
										koncept: true,
										standart: true,
										pod_kluch: true,
									},
									{
										name: '3 варианта планировочного решения',
										koncept: true,
										standart: true,
										pod_kluch: true,
									},
									{
										name: '3D-визуализация интерьера',
										koncept: true,
										standart: true,
										pod_kluch: true,
									},
									{
										name: 'Подбор мебели и аксессуаров',
										koncept: true,
										standart: true,
										pod_kluch: true,
									},
									{
										name: 'Техническая документация',
										koncept: false,
										standart: true,
										pod_kluch: true,
									},
									{
										name: 'Эргономичная планировка',
										koncept: false,
										standart: true,
										pod_kluch: true,
									},
									{
										name: 'Авторский надзор',
										koncept: false,
										standart: false,
										pod_kluch: true,
									},
									{
										name: 'Полная комплектация',
										koncept: false,
										standart: false,
										pod_kluch: true,
									},
								].map((service, index) => (
									<div
										key={service.name}
										className={`grid grid-cols-4 gap-10 py-10 px-12 transition-all duration-200 hover:bg-white/80 border-b border-gray-100/50 last:border-b-0 ${
											index % 2 === 0 ? 'bg-white/30' : 'bg-transparent'
										}`}
									>
										<div className='flex items-center'>
											<div className='w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mr-4 flex-shrink-0'></div>
											<span className='text-gray-800 text-lg font-medium leading-relaxed'>
												{service.name}
											</span>
										</div>

										{/* Концепт */}
										<div className='flex items-center justify-center'>
											{service.koncept ? (
												<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg'>
													<svg
														className='w-5 h-5 text-white'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
															clipRule='evenodd'
														/>
													</svg>
												</div>
											) : (
												<div className='w-10 h-10 bg-gray-200 rounded-2xl flex items-center justify-center'>
													<div className='w-6 h-0.5 bg-gray-400'></div>
												</div>
											)}
										</div>

										{/* Стандарт */}
										<div className='flex items-center justify-center'>
											{service.standart ? (
												<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg'>
													<svg
														className='w-5 h-5 text-white'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
															clipRule='evenodd'
														/>
													</svg>
												</div>
											) : (
												<div className='w-10 h-10 bg-gray-200 rounded-2xl flex items-center justify-center'>
													<div className='w-6 h-0.5 bg-gray-400'></div>
												</div>
											)}
										</div>

										{/* Под ключ */}
										<div className='flex items-center justify-center'>
											{service.pod_kluch ? (
												<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg'>
													<svg
														className='w-5 h-5 text-white'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
															clipRule='evenodd'
														/>
													</svg>
												</div>
											) : (
												<div className='w-10 h-10 bg-gray-200 rounded-2xl flex items-center justify-center'>
													<div className='w-6 h-0.5 bg-gray-400'></div>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Liquid Glass Portfolio */}
			<motion.section
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={stagger}
				className='py-20 md:py-32 bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center relative overflow-hidden'
			>
				{/* Background Elements */}
				<div className='absolute top-10 right-20 w-72 h-72 bg-slate-800/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-10 left-20 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl animate-pulse delay-700' />

				<div className='container mx-auto px-6 max-w-7xl relative z-10'>
					<motion.h2
						variants={fadeInUp}
						className='text-4xl md:text-6xl lg:text-7xl font-thin text-center mb-16 md:mb-24 tracking-tighter text-gray-200'
					>
						НАШИ РАБОТЫ
					</motion.h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
						{[
							{
								src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop&q=80',
								title: 'Минимализм',
								location: 'Москва • 85м²',
							},
							{
								src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&q=80',
								title: 'Современность',
								location: 'СПб • 120м²',
							},
							{
								src: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=600&fit=crop&q=80',
								title: 'Семейный',
								location: 'Москва • 95м²',
							},
							{
								src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop&q=80',
								title: 'Лофт',
								location: 'СПб • 65м²',
							},
						].map((project, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								whileHover={{ scale: 1.02, y: -4 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='group cursor-pointer'
							>
								<div className='relative overflow-hidden rounded-3xl bg-white/8 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/12 hover:border-white/30 transition-all duration-300'>
									<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none' />
									<Image
										src={project.src}
										alt={project.title}
										width={600}
										height={600}
										className='w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500'
									/>
									<div className='p-6 relative z-10'>
										<h3 className='text-xl font-semibold mb-2 text-white'>
											{project.title}
										</h3>
										<p className='text-white/70'>{project.location}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Liquid Glass Contact */}
			<motion.section
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={stagger}
				className='relative py-20 md:py-40 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden'
			>
				{/* Background Elements */}
				<div className='absolute top-20 left-10 w-80 h-80 bg-gray-800/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-gray-700/5 rounded-full blur-3xl animate-pulse delay-1000' />
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-800/5 rounded-full blur-3xl animate-pulse delay-500' />

				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80'
						alt='Contact background'
						fill
						className='object-cover opacity-10'
					/>
					<div className='absolute inset-0 bg-black/80' />
				</div>

				<div className='relative z-10 container mx-auto px-6 text-center max-w-4xl'>
					<motion.h2
						variants={fadeInUp}
						className='text-4xl md:text-6xl lg:text-7xl font-thin mb-12 md:mb-16 tracking-tighter text-gray-200'
					>
						СВЯЗАТЬСЯ
					</motion.h2>

					<motion.div
						variants={stagger}
						className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20'
					>
						<motion.div
							variants={scaleIn}
							whileHover={{ scale: 1.02, y: -2 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='bg-white/8 backdrop-blur-3xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/12 hover:border-white/30 transition-all relative overflow-hidden'
						>
							<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none' />
							<div className='text-2xl md:text-4xl font-light mb-4 text-white relative z-10'>
								8 800 222-85-69
							</div>
							<div className='text-white/70 text-lg relative z-10'>Телефон</div>
						</motion.div>

						<motion.div
							variants={scaleIn}
							whileHover={{ scale: 1.02, y: -2 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='bg-white/8 backdrop-blur-3xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/12 hover:border-white/30 transition-all relative overflow-hidden'
						>
							<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none' />
							<div className='text-2xl md:text-4xl font-light mb-4 text-white relative z-10'>
								hello@rehome.studio
							</div>
							<div className='text-white/70 text-lg relative z-10'>Email</div>
						</motion.div>
					</motion.div>

					<motion.button
						variants={fadeInUp}
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
						className='bg-white/15 backdrop-blur-xl text-white px-12 md:px-20 py-6 md:py-8 rounded-3xl text-xl md:text-2xl font-light border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative overflow-hidden group'
					>
						<span className='relative z-10'>Обсудить проект</span>
						<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl' />
					</motion.button>
				</div>
			</motion.section>

			{/* Liquid Glass Footer */}
			<motion.footer
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={fadeInUp}
				className='py-16 md:py-20 bg-gradient-to-t from-black via-gray-950 to-black border-t border-white/10 flex items-center justify-center relative overflow-hidden'
			>
				{/* Background Elements */}
				<div className='absolute top-0 left-1/4 w-64 h-64 bg-white/2 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-0 right-1/4 w-48 h-48 bg-white/1 rounded-full blur-3xl animate-pulse delay-1000' />

				<div className='container mx-auto px-6 relative z-10'>
					<div className='flex flex-col items-center justify-center text-center space-y-6 md:space-y-8'>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)]'
						>
							<div className='w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]'>
								<span className='text-white font-light text-lg md:text-xl'>
									R
								</span>
							</div>
							<span className='text-2xl md:text-3xl font-extralight tracking-tight text-white/95'>
								REHOME
							</span>
						</motion.div>

						<div className='text-white/50 text-base md:text-lg font-light bg-white/5 backdrop-blur-xl rounded-full px-8 py-3 border border-white/10'>
							© 2025 REHOME. Дизайн интерьеров.
						</div>
					</div>
				</div>
			</motion.footer>

			{/* Liquid Glass Telegram Button */}
			<motion.div
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
				className='fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50'
			>
				<motion.button
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 400, damping: 25 }}
					className='bg-white/15 backdrop-blur-3xl text-white w-16 md:w-18 h-16 md:h-18 rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative overflow-hidden group'
				>
					<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl md:rounded-3xl pointer-events-none' />
					<svg
						className='w-7 md:w-8 h-7 md:h-8 relative z-10'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
					</svg>
					<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl md:rounded-3xl' />
				</motion.button>
			</motion.div>
		</div>
	)
}
