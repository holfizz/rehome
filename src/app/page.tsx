'use client'

import {
	AnimatePresence,
	motion,
	useInView,
	useMotionValue,
	useTransform,
} from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

// Structured Data for SEO
const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'REHOME - Студия дизайна интерьера',
	image: 'https://rehomekz.vercel.app/assets/case1_ph2.webp',
	'@id': 'https://rehomekz.vercel.app',
	url: 'https://rehomekz.vercel.app',
	telephone: '+7-927-439-43-55',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'ул. Баумана',
		addressLocality: 'Казань',
		postalCode: '420000',
		addressRegion: 'Республика Татарстан',
		addressCountry: 'RU',
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 55.8304,
		longitude: 49.0661,
	},
	openingHoursSpecification: {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		opens: '09:00',
		closes: '20:00',
	},
	sameAs: ['https://t.me/m_ilya31', 'https://wa.me/79274394355'],
	priceRange: '₽₽₽',
	servedCuisine: ['Interior Design', 'Home Renovation'],
	description:
		'Профессиональный дизайн интерьера и ремонт квартир в Казани. Студия REHOME создает уникальные интерьеры с индивидуальным подходом.',
	areaServed: {
		'@type': 'City',
		name: 'Казань',
	},
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Услуги дизайна интерьера',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Дизайн-проект квартиры',
					description: 'Полный дизайн-проект квартиры с 3D визуализацией',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Ремонт под ключ',
					description: 'Комплексный ремонт квартир под ключ в Казани',
				},
			},
		],
	},
	founder: {
		'@type': 'Person',
		name: 'Макаров Илья Дмитриевич',
	},
}

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

export default function Home() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	// Параллакс эффекты
	const scrollY = useMotionValue(0)
	const scrollParallax = useTransform(scrollY, [0, 1000], [0, -200])

	// Reviews slider state
	const [currentReviewSlide, setCurrentReviewSlide] = useState(0)
	const reviewsPerSlide = 3
	const reviewsPerSlideMobile = 1
	const totalReviews = 10
	const totalSlides = Math.ceil(totalReviews / reviewsPerSlide)
	const totalSlidesMobile = Math.ceil(totalReviews / reviewsPerSlideMobile)

	// Chat widget state
	const [isChatOpen, setIsChatOpen] = useState(false)

	// Modal state for reviews
	const [selectedReview, setSelectedReview] = useState<number | null>(null)

	// Mobile detection
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	useEffect(() => {
		const handleScroll = () => {
			scrollY.set(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [scrollY])

	const nextReviewSlide = () => {
		const maxSlides = isMobile ? totalSlidesMobile : totalSlides
		setCurrentReviewSlide(prev => (prev + 1) % maxSlides)
	}

	const prevReviewSlide = () => {
		const maxSlides = isMobile ? totalSlidesMobile : totalSlides
		setCurrentReviewSlide(prev => (prev - 1 + maxSlides) % maxSlides)
	}

	const getReviewsForSlide = (slideIndex: number) => {
		const perSlide = isMobile ? reviewsPerSlideMobile : reviewsPerSlide
		const startIndex = slideIndex * perSlide
		const reviews = []
		for (let i = 1; i <= totalReviews; i++) {
			reviews.push(i)
		}
		return reviews.slice(startIndex, startIndex + perSlide)
	}

	// Different widths for reviews (in percentages)
	const reviewWidths = [
		'w-[280px]', // All reviews same width on desktop
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
		'w-[280px]',
	]

	return (
		<>
			<Head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				<meta name='geo.region' content='RU-TA' />
				<meta name='geo.placename' content='Казань' />
				<meta name='geo.position' content='55.8304;49.0661' />
				<meta name='ICBM' content='55.8304, 49.0661' />
				<link rel='canonical' href='https://rehomekz.vercel.app' />
			</Head>
			<div
				className='min-h-screen bg-black text-white overflow-x-hidden'
				style={{
					WebkitOverflowScrolling: 'touch',
					overflowY: 'auto',
					height: '100vh',
				}}
			>
				<Header />

				{/* Hero Section */}
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className='relative pt-56 md:pt-48 pb-20 px-4 overflow-hidden'
				>
					<div className='absolute inset-0'>
						<motion.div
							initial={{ opacity: 0, scale: 1.05 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
							className='relative w-full h-full'
						>
							<Image
								src='/assets/case1_ph2.webp'
								alt='Дизайн интерьера квартиры в Казани - современный ремонт от REHOME'
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
						className='relative z-20 text-center max-w-5xl mx-auto px-4 md:px-8 mt-8 md:mt-0'
					>
						{/* Glass Card Container */}
						<motion.div
							style={{ y: scrollParallax }}
							className='bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] p-6 md:p-12 lg:p-16 xl:p-20 relative overflow-hidden'
						>
							{/* Inner Glass Reflection */}
							<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2rem] md:rounded-[3rem] pointer-events-none' />

							{/* Content */}
							<div className='relative z-10'>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.8 }}
									className='mb-4 md:mb-6'
								>
									<span className='text-xs md:text-sm text-white/70 font-light tracking-[0.2em] uppercase'>
										Студия дизайна интерьеров • Казань • 2025
									</span>
								</motion.div>

								<motion.h1
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 1, delay: 1 }}
									className='text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-thin mb-6 md:mb-8 tracking-[-0.02em] leading-[0.9] text-white'
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
									className='mb-8 md:mb-12'
								>
									<h2 className='text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-3 md:mb-4 font-light max-w-3xl mx-auto leading-relaxed px-4'>
										Дизайн интерьера Казань - не завершаем проект, пока всё не
										будет на 100% как вы мечтали
									</h2>
									<p className='text-sm md:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed px-4'>
										Профессиональный ремонт квартир в Казани под ключ. Мы
										доводим каждую деталь до совершенства, чтобы ваш интерьер
										полностью соответствовал вашим ожиданиям и даже превосходил
										их.
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 1.6 }}
									className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'
								>
									<motion.a
										href='/contact'
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{ type: 'spring', stiffness: 400, damping: 25 }}
										className='bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center'
									>
										Заказать дизайн-проект
									</motion.a>
									<motion.a
										href='/portfolio'
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{ type: 'spring', stiffness: 400, damping: 25 }}
										className='bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto text-center'
									>
										Портфолио работ в Казани
									</motion.a>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</motion.section>

				{/* Combined About & Services Section */}
				<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
					{/* Enhanced gradient background */}
					<div className='absolute inset-0 bg-gradient-to-br from-gray-200 via-slate-300 to-gray-200'></div>

					{/* Subtle mesh pattern overlay */}
					<div
						className='absolute inset-0 opacity-[0.02]'
						style={{
							backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
							backgroundSize: '32px 32px',
						}}
					></div>

					{/* Enhanced radial gradients */}
					<div className='absolute top-0 left-0 w-96 h-96 opacity-20'>
						<div className='w-full h-full bg-gradient-radial from-blue-400/30 via-blue-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					<div className='absolute top-1/4 right-0 w-80 h-80 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-purple-400/35 via-purple-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					<div className='absolute bottom-0 left-1/3 w-72 h-72 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-emerald-400/30 via-emerald-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					<div className='absolute bottom-1/4 right-1/4 w-64 h-64 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-rose-400/30 via-rose-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10'>
						<div className='w-full h-full bg-gradient-radial from-indigo-400/30 via-indigo-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					<div className='absolute top-10 right-1/3 w-56 h-56 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-cyan-400/30 via-cyan-300/15 to-transparent rounded-full blur-3xl'></div>
					</div>

					{/* Subtle geometric shapes */}
					<div className='absolute top-20 left-20 w-32 h-32 opacity-5'>
						<div className='w-full h-full bg-gradient-to-br from-gray-500 to-gray-600 rounded-full blur-xl'></div>
					</div>

					<div className='absolute bottom-32 right-20 w-24 h-24 opacity-5'>
						<div className='w-full h-full bg-gradient-to-tl from-gray-500 to-gray-600 rounded-lg rotate-45 blur-xl'></div>
					</div>

					<div className='container mx-auto px-4 md:px-8 relative z-10'>
						{/* Philosophy Section */}
						<motion.div
							ref={ref}
							variants={stagger}
							initial='initial'
							animate={isInView ? 'animate' : 'initial'}
							className='max-w-6xl mx-auto mb-20 md:mb-32'
						>
							<motion.div
								variants={fadeInUp}
								className='text-center mb-12 md:mb-20'
							>
								<span className='text-xs md:text-sm text-gray-700 font-light tracking-[0.2em] uppercase mb-4 block'>
									Студия дизайна интерьера в Казани
								</span>
								<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-gray-900 tracking-[-0.02em]'>
									Дизайн квартир Казань - совершенство в каждой детали
								</h2>
								<p className='text-base md:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed font-light'>
									Мы верим, что идеальный ремонт в Казани создается из тщательно
									продуманных деталей. Наша команда дизайнеров интерьера не
									останавливается, пока каждый элемент интерьера не будет
									соответствовать вашему видению на 100%.
								</p>
							</motion.div>

							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12'>
								<motion.div
									variants={fadeInUp}
									className='bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-300/50 hover:border-gray-400/60 hover:shadow-xl transition-all duration-300 group'
								>
									<div className='relative overflow-hidden rounded-2xl mb-6 md:mb-8'>
										<Image
											src='/assets/case1_ph3.webp'
											alt='Индивидуальный дизайн интерьера квартиры в Казани'
											width={500}
											height={300}
											className='w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									</div>
									<h3 className='text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-gray-900'>
										Индивидуальный подход к дизайну
									</h3>
									<p className='text-base md:text-lg text-gray-700 leading-relaxed font-light'>
										Мы внимательно слушаем ваши пожелания и не останавливаемся,
										пока не найдем идеальное решение для вашего дома в Казани.
										Каждый дизайн-проект уникален, как и ваше представление об
										идеальном жилье.
									</p>
								</motion.div>

								<motion.div
									variants={fadeInUp}
									className='bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-300/50 hover:border-gray-400/60 hover:shadow-xl transition-all duration-300 group'
								>
									<div className='relative overflow-hidden rounded-2xl mb-6 md:mb-8'>
										<Image
											src='/assets/case1_ph7.webp'
											alt='Современный дизайн интерьера в Казани - ремонт под ключ'
											width={500}
											height={300}
											className='w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									</div>
									<h3 className='text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-gray-900'>
										Современные решения для Казани
									</h3>
									<p className='text-base md:text-lg text-gray-700 leading-relaxed font-light'>
										Используем передовые технологии и материалы в ремонте
										квартир, но никогда не жертвуем комфортом ради тренда. Мы
										доводим до совершенства каждую деталь, чтобы вы были на 100%
										довольны результатом.
									</p>
								</motion.div>
							</div>
						</motion.div>

						{/* Process Section */}
						<motion.div
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-12 md:mb-20'
						>
							<span className='text-xs md:text-sm text-gray-700 font-light tracking-[0.2em] uppercase mb-4 block'>
								Как мы работаем в Казани
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-gray-900 tracking-[-0.02em]'>
								Ремонт под ключ Казань - путь к идеальному результату
							</h2>
							<p className='text-base md:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed font-light'>
								Мы не завершаем работу над дизайн-проектом, пока вы не будете
								полностью довольны каждым аспектом проекта
							</p>
						</motion.div>

						<div className='relative max-w-5xl mx-auto'>
							{/* Connecting line */}
							<div className='hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent'></div>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
								{[
									{
										number: '01',
										title: 'Консультация и концепция дизайна',
										description:
											'Внимательно изучаем ваши пожелания по дизайну квартиры в Казани и создаем концепцию, которая на 100% отражает ваше видение. Работаем над ней, пока вы не будете полностью удовлетворены.',
										duration: '1-2 недели',
									},
									{
										number: '02',
										title: 'Дизайн-проект с 3D визуализацией',
										description:
											'Разрабатываем детальный дизайн-проект вашей квартиры с 3D-визуализацией. Вносим любые корректировки, пока каждый элемент интерьера не будет соответствовать вашим ожиданиям на 100%.',
										duration: '3-4 недели',
									},
									{
										number: '03',
										title: 'Ремонт и реализация в Казани',
										description:
											'Когда воплощаем дизайн-проект, контролируем каждую деталь ремонта. Проект считается завершенным только когда вы на 100% довольны результатом.',
										duration: '2-6 месяцев',
									},
								].map((step, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 40 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.2 }}
										viewport={{ once: true }}
										className='relative'
									>
										{/* Step number circle */}
										<div className='relative mb-6 md:mb-8'>
											<div className='w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-400/40 rounded-full flex items-center justify-center mx-auto shadow-lg backdrop-blur-xl'>
												<span className='text-xl md:text-2xl font-light text-gray-900'>
													{step.number}
												</span>
											</div>
											{/* Connecting dots for mobile */}
											{index < 2 && (
												<div className='lg:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 mb-4'>
													<div className='flex flex-col items-center space-y-2'>
														<div className='w-1 h-1 bg-gray-400/60 rounded-full'></div>
														<div className='w-1 h-1 bg-gray-400/60 rounded-full'></div>
														<div className='w-1 h-1 bg-gray-400/60 rounded-full'></div>
													</div>
												</div>
											)}
										</div>

										{/* Content card */}
										<div className='bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-300/50 hover:border-gray-400/60 hover:shadow-xl transition-all duration-300 text-center'>
											<h3 className='text-lg md:text-xl lg:text-2xl font-light mb-4 md:mb-6 text-gray-900'>
												{step.title}
											</h3>
											<p className='text-sm md:text-base text-gray-700 leading-relaxed font-light mb-4 md:mb-6'>
												{step.description}
											</p>
											<div className='inline-flex items-center justify-center bg-gray-200/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-300/60'>
												<span className='text-xs md:text-sm text-gray-800 font-medium'>
													⏱️ {step.duration}
												</span>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Children Section */}
				<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
					{/* Background */}
					<div className='absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-blue-900/20' />

					<div className='container mx-auto px-4 md:px-8 relative z-10'>
						<div className='grid lg:grid-cols-2 gap-12 md:gap-16 items-center'>
							<motion.div
								initial={{ opacity: 0, x: -60 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
									Дизайн детских комнат в Казани
								</span>
								<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
									Дизайн для всей семьи - 100% счастья каждого
								</h2>
								<p className='text-base md:text-lg text-white/80 mb-6 md:mb-8 leading-relaxed font-light'>
									Мы создаем интерьеры в Казани, где каждый член семьи найдет
									идеальное место для себя. Детские комнаты продумываются до
									мельчайших деталей, чтобы полностью соответствовать
									потребностям и мечтам вашего ребенка.
								</p>
								<p className='text-base md:text-lg text-white/70 mb-8 leading-relaxed font-light'>
									Наша работа над дизайном квартиры завершена только тогда,
									когда каждый член семьи на 100% доволен своим пространством.
									Мы не останавливаемся на компромиссах.
								</p>
								<motion.a
									href='/portfolio'
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='inline-block bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all'
								>
									Детские проекты в Казани
								</motion.a>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 60 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
								className='relative'
							>
								<div className='relative overflow-hidden rounded-2xl md:rounded-3xl'>
									<Image
										src='/assets/case2_ph5.webp'
										alt='Дизайн детской комнаты для девочки в Казани - проект REHOME'
										width={800}
										height={600}
										className='w-full h-72 md:h-84 lg:h-100 object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
									<div className='absolute bottom-6 left-6 right-6'>
										<div className='bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30'>
											<h3 className='text-lg md:text-xl font-light mb-2 text-white'>
												Детская для принцессы в Казани
											</h3>
											<p className='text-sm text-white/80'>
												Волшебное пространство для маленькой мечтательницы
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Portfolio Preview Section */}
				<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
					{/* Background */}
					<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-neutral-900' />

					<div className='container mx-auto px-4 md:px-8 relative z-10'>
						<motion.div
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-12 md:mb-20'
						>
							<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
								Портфолио дизайна в Казани
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
								Реализованные проекты в Казани - доведенные до совершенства
							</h2>
							<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
								Каждая работа в нашем портфолио — результат кропотливого
								внимания к деталям и стремления к 100% удовлетворенности клиента
								из Казани
							</p>
						</motion.div>

						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-6xl mx-auto'>
							{[
								{
									id: 1,
									image: '/assets/case1_ph2.webp',
									title: 'Современная квартира "Элегант" в Казани',
									area: '95 м²',
									description:
										'Минималистичный дизайн интерьера с акцентом на функциональность',
									photos: 17,
								},
								{
									id: 2,
									image: '/assets/case2_ph1.webp',
									title: 'Детские комнаты "Семейное счастье"',
									area: '78 м²',
									description:
										'Яркие и безопасные пространства для детей в Казани',
									photos: 6,
								},
								{
									id: 4,
									image: '/assets/case4_ph1.webp',
									title: 'Квартира "Мировое путешествие"',
									area: '120 м²',
									description: 'Яркие цвета разных континентов в одном доме',
									photos: 14,
								},
							].map((project, index) => (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
									className='group cursor-pointer'
								>
									<Link href={`/portfolio/${project.id}`}>
										<div className='relative overflow-hidden rounded-2xl md:rounded-3xl mb-4 md:mb-6'>
											<Image
												src={project.image}
												alt={`${project.title} - дизайн интерьера в Казани от REHOME`}
												width={600}
												height={450}
												className='w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500' />

											{/* Photo count badge */}
											<div className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1'>
												<span className='text-xs font-medium text-white'>
													📸 {project.photos} фото
												</span>
											</div>

											{/* Hover overlay with description */}
											<div className='absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500'>
												<div className='bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 w-full'>
													<p className='text-sm text-white/90 leading-relaxed'>
														{project.description}
													</p>
												</div>
											</div>
										</div>
										<div className='bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 group-hover:border-white/20 transition-all'>
											<h3 className='text-lg md:text-xl font-light mb-2 text-white'>
												{project.title}
											</h3>
											<p className='text-sm text-white/70 mb-3'>
												{project.area}
											</p>
											<div className='flex items-center text-xs text-white/60'>
												<span>Посмотреть проект →</span>
											</div>
										</div>
									</Link>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center'
						>
							<motion.a
								href='/portfolio'
								whileHover={{ scale: 1.05, y: -3 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='inline-flex items-center bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-base md:text-lg border border-white/30 hover:from-white/20 hover:to-white/15 hover:border-white/40 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)] group'
							>
								<span>Все проекты дизайна в Казани</span>
								<svg
									className='w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17 8l4 4m0 0l-4 4m4-4H3'
									/>
								</svg>
							</motion.a>
						</motion.div>
					</div>
				</section>

				{/* Reviews Section */}
				<section
					id='reviews'
					className='py-16 md:py-24 lg:py-32 relative overflow-hidden'
				>
					{/* Background */}
					<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900' />

					<div className='container mx-auto px-4 md:px-8 relative z-10'>
						<motion.div
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-12 md:mb-20'
						>
							<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
								Отзывы о дизайне интерьера в Казани
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
								Что говорят наши клиенты из Казани
							</h2>
							<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
								Каждый отзыв — это подтверждение нашего стремления к
								совершенству в дизайне интерьера
							</p>
						</motion.div>

						<div className='relative max-w-7xl mx-auto'>
							{/* Reviews Slider */}
							<div className='overflow-hidden'>
								<motion.div
									className='flex transition-transform duration-500 ease-in-out'
									style={{
										transform: `translateX(-${currentReviewSlide * 100}%)`,
									}}
								>
									{Array.from({
										length: isMobile ? totalSlidesMobile : totalSlides,
									}).map((_, slideIndex) => (
										<div key={slideIndex} className='w-full flex-shrink-0'>
											<div
												className={`flex ${
													isMobile ? 'justify-center' : 'justify-center'
												} gap-6 md:gap-8 px-4`}
											>
												{getReviewsForSlide(slideIndex).map(reviewNumber => (
													<motion.div
														key={reviewNumber}
														initial={{ opacity: 0, y: 40 }}
														whileInView={{ opacity: 1, y: 0 }}
														transition={{
															duration: 0.6,
															delay:
																((reviewNumber - 1) % (isMobile ? 1 : 3)) * 0.2,
														}}
														viewport={{ once: true }}
														className={`${
															isMobile
																? 'w-[280px]'
																: reviewWidths[reviewNumber - 1]
														} group cursor-pointer flex-shrink-0`}
														onClick={() => setSelectedReview(reviewNumber)}
													>
														<div className='relative w-full'>
															<Image
																src={`/assets/reviews/${reviewNumber}.jpg`}
																alt={`Отзыв клиента ${reviewNumber} о дизайне интерьера в Казани - REHOME`}
																width={1107}
																height={0}
																className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl md:rounded-3xl'
																style={{ height: 'auto' }}
															/>
															{/* Zoom icon */}
															<div className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
																<svg
																	className='w-4 h-4 text-white'
																	fill='none'
																	stroke='currentColor'
																	viewBox='0 0 24 24'
																>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		strokeWidth={2}
																		d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
																	/>
																</svg>
															</div>
														</div>
													</motion.div>
												))}
											</div>
										</div>
									))}
								</motion.div>
							</div>

							{/* Navigation Controls */}
							<div className='flex justify-center items-center mt-8 md:mt-12 space-x-4'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={prevReviewSlide}
									className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 md:p-4 hover:bg-white/15 hover:border-white/30 transition-all'
								>
									<svg
										className='w-5 h-5 md:w-6 md:h-6 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 19l-7-7 7-7'
										/>
									</svg>
								</motion.button>

								<div className='flex space-x-2'>
									{Array.from({
										length: isMobile ? totalSlidesMobile : totalSlides,
									}).map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentReviewSlide(index)}
											className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
												index === currentReviewSlide
													? 'bg-white'
													: 'bg-white/30 hover:bg-white/50'
											}`}
										/>
									))}
								</div>

								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={nextReviewSlide}
									className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 md:p-4 hover:bg-white/15 hover:border-white/30 transition-all'
								>
									<svg
										className='w-5 h-5 md:w-6 md:h-6 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 5l7 7-7 7'
										/>
									</svg>
								</motion.button>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
					{/* Background */}
					<div className='absolute inset-0 bg-gradient-to-br from-gray-800 via-neutral-800 to-stone-800' />

					<div className='container mx-auto px-4 md:px-8 relative z-10'>
						<motion.div
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center max-w-4xl mx-auto'
						>
							<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
								Заказать дизайн интерьера в Казани
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
								Готовы создать интерьер вашей мечты в Казани?
							</h2>
							<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
								Расскажите нам о своем видении дизайна квартиры, и мы не
								остановимся, пока оно не будет реализовано на 100%
							</p>

							<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
								<motion.a
									href='/contact'
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center'
								>
									Обсудить дизайн-проект
								</motion.a>
								<motion.a
									href='https://t.me/m_ilya31'
									target='_blank'
									rel='noopener noreferrer'
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto text-center'
								>
									Написать в Telegram
								</motion.a>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Footer */}
				<Footer />
			</div>

			{/* Fixed Chat Widget - Global */}
			<div className='fixed bottom-6 right-6 z-[9999]'>
				<div className='relative'>
					{/* Contact Options */}
					{isChatOpen && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							className='absolute bottom-16 right-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 space-y-3 min-w-[200px]'
						>
							<motion.a
								href='tel:+79274394355'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='flex items-center space-x-3 bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all'
							>
								<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
									<svg
										className='w-4 h-4 text-white'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
									</svg>
								</div>
								<span className='text-white text-sm font-light'>Позвонить</span>
							</motion.a>

							<motion.a
								href='https://t.me/m_ilya31'
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='flex items-center space-x-3 bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all'
							>
								<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
									<svg
										className='w-4 h-4 text-white'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.56c-.12.56-.44.7-.9.44l-2.52-1.86-1.21 1.17c-.14.14-.25.25-.5.25l.18-2.51 4.56-4.12c.2-.18-.04-.28-.3-.1L9.39 13.17l-2.42-.76c-.52-.16-.53-.52.12-.78l9.46-3.64c.43-.16.8.1.66.61z' />
									</svg>
								</div>
								<span className='text-white text-sm font-light'>Telegram</span>
							</motion.a>

							<motion.a
								href='https://wa.me/79274394355'
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='flex items-center space-x-3 bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all'
							>
								<div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
									<svg
										className='w-4 h-4 text-white'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106' />
									</svg>
								</div>
								<span className='text-white text-sm font-light'>WhatsApp</span>
							</motion.a>
						</motion.div>
					)}

					{/* Main Chat Button */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						animate={{ rotate: isChatOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setIsChatOpen(!isChatOpen)}
						className='w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all shadow-lg'
					>
						{isChatOpen ? (
							<svg
								className='w-6 h-6 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						) : (
							<svg
								className='w-6 h-6 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
								/>
							</svg>
						)}
					</motion.button>
				</div>
			</div>

			{/* Review Modal */}
			<AnimatePresence>
				{selectedReview && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-4'
						onClick={() => setSelectedReview(null)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl'
							onClick={e => e.stopPropagation()}
						>
							<Image
								src={`/assets/reviews/${selectedReview}.jpg`}
								alt={`Отзыв клиента ${selectedReview} о дизайне интерьера в Казани - REHOME`}
								width={1107}
								height={1200}
								className='w-auto h-auto max-w-full max-h-[90vh] object-contain'
							/>
							<button
								onClick={() => setSelectedReview(null)}
								className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors'
							>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
