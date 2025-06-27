'use client'

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Header from '../components/Header'

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

	useEffect(() => {
		const handleScroll = () => {
			scrollY.set(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [scrollY])

	return (
		<div
			className='min-h-screen bg-black text-white overflow-x-hidden'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
				height: '100vh',
			}}
		>
			<Header />

			<section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0'>
				<div className='absolute inset-0'>
					<motion.div
						initial={{ opacity: 0, scale: 1.05 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
						className='relative w-full h-full'
					>
						<Image
							src='/assets/case1_ph2.webp'
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
									Не завершаем проект, пока всё не будет на 100% как вы мечтали
								</h2>
								<p className='text-sm md:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed px-4'>
									Мы доводим каждую деталь до совершенства, чтобы ваш интерьер
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
									Начать проект
								</motion.a>
								<motion.a
									href='/portfolio'
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: 'spring', stiffness: 400, damping: 25 }}
									className='bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto text-center'
								>
									Посмотреть работы
								</motion.a>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</section>

			{/* Combined About & Services Section */}
			<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
				{/* Multi-point radial gradient background */}
				<div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100'></div>

				{/* Радиальные градиенты из разных углов */}
				<div className='absolute top-0 left-0 w-96 h-96 opacity-40'>
					<div className='w-full h-full bg-gradient-radial from-blue-100/60 via-blue-50/30 to-transparent rounded-full blur-3xl'></div>
				</div>

				<div className='absolute top-1/4 right-0 w-80 h-80 opacity-35'>
					<div className='w-full h-full bg-gradient-radial from-purple-100/50 via-purple-50/25 to-transparent rounded-full blur-3xl'></div>
				</div>

				<div className='absolute bottom-0 left-1/3 w-72 h-72 opacity-30'>
					<div className='w-full h-full bg-gradient-radial from-green-100/45 via-green-50/20 to-transparent rounded-full blur-3xl'></div>
				</div>

				<div className='absolute bottom-1/4 right-1/4 w-64 h-64 opacity-25'>
					<div className='w-full h-full bg-gradient-radial from-pink-100/40 via-pink-50/15 to-transparent rounded-full blur-3xl'></div>
				</div>

				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20'>
					<div className='w-full h-full bg-gradient-radial from-gray-200/50 via-gray-100/25 to-transparent rounded-full blur-3xl'></div>
				</div>

				<div className='absolute top-10 right-1/3 w-56 h-56 opacity-30'>
					<div className='w-full h-full bg-gradient-radial from-indigo-100/45 via-indigo-50/20 to-transparent rounded-full blur-3xl'></div>
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
							<span className='text-xs md:text-sm text-gray-600 font-light tracking-[0.2em] uppercase mb-4 block'>
								О студии
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-gray-900 tracking-[-0.02em]'>
								Совершенство в каждой детали
							</h2>
							<p className='text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light'>
								Мы верим, что идеальный ремонт создается из тщательно
								продуманных деталей. Наша команда не останавливается, пока
								каждый элемент интерьера не будет соответствовать вашему видению
								на 100%.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12'>
							<motion.div
								variants={fadeInUp}
								className='bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group'
							>
								<div className='relative overflow-hidden rounded-2xl mb-6 md:mb-8'>
									<Image
										src='/assets/case1_ph3.webp'
										alt='Индивидуальный подход'
										width={500}
										height={300}
										className='w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								</div>
								<h3 className='text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-gray-900'>
									Индивидуальный подход
								</h3>
								<p className='text-base md:text-lg text-gray-600 leading-relaxed font-light'>
									Мы внимательно слушаем ваши пожелания и не останавливаемся,
									пока не найдем идеальное решение. Каждый проект уникален, как
									и ваше представление об идеальном жилье.
								</p>
							</motion.div>

							<motion.div
								variants={fadeInUp}
								className='bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group'
							>
								<div className='relative overflow-hidden rounded-2xl mb-6 md:mb-8'>
									<Image
										src='/assets/case1_ph7.webp'
										alt='Современные решения'
										width={500}
										height={300}
										className='w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								</div>
								<h3 className='text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-gray-900'>
									Современные решения
								</h3>
								<p className='text-base md:text-lg text-gray-600 leading-relaxed font-light'>
									Используем передовые технологии и материалы, но никогда не
									жертвуем комфортом ради тренда. Мы доводим до совершенства
									каждую деталь, чтобы вы были на 100% довольны результатом.
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
						<span className='text-xs md:text-sm text-gray-600 font-light tracking-[0.2em] uppercase mb-4 block'>
							Процесс работы
						</span>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-gray-900 tracking-[-0.02em]'>
							Путь к идеальному результату
						</h2>
						<p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light'>
							Мы не завершаем работу, пока вы не будете полностью довольны
							каждым аспектом проекта
						</p>
					</motion.div>

					<div className='relative max-w-5xl mx-auto'>
						{/* Connecting line */}
						<div className='hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
							{[
								{
									number: '01',
									title: 'Знакомство и концепция',
									description:
										'Внимательно изучаем ваши пожелания и создаем концепцию, которая на 100% отражает ваше видение. Работаем над ней, пока вы не будете полностью удовлетворены.',
									duration: '1-2 недели',
								},
								{
									number: '02',
									title: 'Дизайн-проект',
									description:
										'Разрабатываем детальный проект с 3D-визуализацией. Вносим любые корректировки, пока каждый элемент не будет соответствовать вашим ожиданиям на 100%.',
									duration: '3-4 недели',
								},
								{
									number: '03',
									title: 'Реализация',
									description:
										'Когда воплощаем проект, контролируем каждую деталь. Проект считается завершенным только когда вы на 100% довольны результатом.',
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
										<div className='w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-100 to-white border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto shadow-lg'>
											<span className='text-xl md:text-2xl font-light text-gray-900'>
												{step.number}
											</span>
										</div>
										{/* Connecting dots for mobile */}
										{index < 2 && (
											<div className='lg:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 mb-4'>
												<div className='flex flex-col items-center space-y-2'>
													<div className='w-1 h-1 bg-gray-300 rounded-full'></div>
													<div className='w-1 h-1 bg-gray-300 rounded-full'></div>
													<div className='w-1 h-1 bg-gray-300 rounded-full'></div>
												</div>
											</div>
										)}
									</div>

									{/* Content card */}
									<div className='bg-gradient-to-br from-white via-gray-50/40 to-gray-100/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 text-center'>
										<h3 className='text-lg md:text-xl lg:text-2xl font-light mb-4 md:mb-6 text-gray-900'>
											{step.title}
										</h3>
										<p className='text-sm md:text-base text-gray-600 leading-relaxed font-light mb-4 md:mb-6'>
											{step.description}
										</p>
										<div className='inline-flex items-center justify-center bg-gray-100 rounded-full px-4 py-2'>
											<span className='text-xs md:text-sm text-gray-700 font-medium'>
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
								Для всей семьи
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
								100% счастья для каждого члена семьи
							</h2>
							<p className='text-base md:text-lg text-white/80 mb-6 md:mb-8 leading-relaxed font-light'>
								Мы создаем пространства, где каждый член семьи найдет идеальное
								место для себя. Детские комнаты продумываются до мельчайших
								деталей, чтобы полностью соответствовать потребностям и мечтам
								вашего ребенка.
							</p>
							<p className='text-base md:text-lg text-white/70 mb-8 leading-relaxed font-light'>
								Наша работа завершена только тогда, когда каждый член семьи на
								100% доволен своим пространством. Мы не останавливаемся на
								компромиссах.
							</p>
							<motion.a
								href='/portfolio'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='inline-block bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all'
							>
								Посмотреть детские проекты
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
									alt='Детская комната для девочки'
									width={800}
									height={600}
									className='w-full h-72 md:h-84 lg:h-100 object-cover'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
								<div className='absolute bottom-6 left-6 right-6'>
									<div className='bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30'>
										<h3 className='text-lg md:text-xl font-light mb-2 text-white'>
											Детская для принцессы
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
							Портфолио
						</span>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Проекты, доведенные до совершенства
						</h2>
						<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
							Каждая работа в нашем портфолио — результат кропотливого внимания
							к деталям и стремления к 100% удовлетворенности клиента
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 max-w-7xl mx-auto'>
						{[
							{
								id: 1,
								image: '/assets/case1_ph2.webp',
								title: 'Современная квартира "Элегант"',
								area: '95 м²',
								description:
									'Минималистичный дизайн с акцентом на функциональность',
								photos: 17,
							},
							{
								id: 2,
								image: '/assets/case2_ph1.webp',
								title: 'Детские комнаты "Семейное счастье"',
								area: '78 м²',
								description: 'Яркие и безопасные пространства для детей',
								photos: 6,
							},
							{
								id: 3,
								image: '/assets/case3_ph1.webp',
								title: 'Квартира "Сакура"',
								area: '85 м²',
								description: 'Нежный японский стиль с цветочными акцентами',
								photos: 4,
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
											alt={project.title}
											width={500}
											height={400}
											className='w-full h-56 md:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110'
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
										<h3 className='text-base md:text-lg font-light mb-2 text-white'>
											{project.title}
										</h3>
										<p className='text-sm text-white/70 mb-2'>{project.area}</p>
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
							whileHover={{ scale: 1.02, y: -2 }}
							whileTap={{ scale: 0.98 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='inline-block bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all'
						>
							Смотреть все проекты
						</motion.a>
					</motion.div>
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
							Контакты
						</span>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Готовы создать интерьер вашей мечты?
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Расскажите нам о своем видении, и мы не остановимся, пока оно не
							будет реализовано на 100%
						</p>

						<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
							<motion.a
								href='/contact'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center'
							>
								Обсудить проект
							</motion.a>
							<motion.a
								href='https://t.me/holfizz'
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
			<footer className='py-8 md:py-12 border-t border-white/10 relative'>
				<div className='container mx-auto px-4 md:px-8'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<div className='flex items-center space-x-4'>
							<div className='w-8 h-8 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30'>
								<span className='text-white font-light text-sm'>R</span>
							</div>
							<span className='text-xl font-extralight text-white/95'>
								REHOME
							</span>
						</div>
						<p className='text-sm text-white/60 font-light text-center md:text-left'>
							© 2025 REHOME. Студия дизайна интерьеров в Казани
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
