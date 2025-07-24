'use client'

import { motion } from 'framer-motion'
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

export default function Home() {
	// Chat widget state
	const [isChatOpen, setIsChatOpen] = useState(false)

	// Contact form state
	const [selectedMethod, setSelectedMethod] = useState('')
	const [contactInfo, setContactInfo] = useState('')
	const [showConfetti, setShowConfetti] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (selectedMethod && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 300)
		}
	}, [selectedMethod])

	useEffect(() => {
		if (
			(selectedMethod === 'phone' || selectedMethod === 'whatsapp') &&
			!contactInfo
		) {
			setContactInfo('+7 ')
		} else if (selectedMethod === 'telegram' && contactInfo === '+7 ') {
			setContactInfo('')
		}
	}, [selectedMethod, contactInfo])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!selectedMethod || !contactInfo) return

		const validationError = validateContact(contactInfo, selectedMethod)
		if (validationError) {
			setError(validationError)
			return
		}

		setIsLoading(true)
		setError('')

		try {
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					method: selectedMethod,
					contact: contactInfo,
				}),
			})

			if (response.ok) {
				setShowConfetti(true)
				setIsSubmitted(true)

				setTimeout(() => {
					setShowConfetti(false)
				}, 3000)

				setTimeout(() => {
					setIsSubmitted(false)
					setSelectedMethod('')
					setContactInfo('')
				}, 5000)
			} else {
				const errorData = await response.json()
				setError(errorData.error || 'Произошла ошибка при отправке')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			setError('Ошибка сети. Попробуйте еще раз.')
		} finally {
			setIsLoading(false)
		}
	}

	const getInputPlaceholder = () => {
		switch (selectedMethod) {
			case 'whatsapp':
				return '+7 999 999-99-99'
			case 'telegram':
				return '@username или +7 999 999-99-99'
			case 'phone':
				return '+7 999 999-99-99'
			default:
				return 'Выберите способ связи'
		}
	}

	const getInputLabel = () => {
		switch (selectedMethod) {
			case 'whatsapp':
				return 'Ваш номер WhatsApp'
			case 'telegram':
				return 'Ваш Telegram'
			case 'phone':
				return 'Ваш номер телефона'
			default:
				return 'Контактная информация'
		}
	}

	const validateContact = (contact: string, method: string) => {
		if (!contact.trim()) return 'Поле не может быть пустым'

		if (method === 'phone' || method === 'whatsapp') {
			const digitsOnly = contact.replace(/\D/g, '')
			if (digitsOnly.length !== 11 || !digitsOnly.startsWith('7')) {
				return 'Введите корректный номер телефона'
			}
		}

		if (method === 'telegram') {
			const telegramRegex =
				/^(@[a-zA-Z0-9_]{5,32}|(\+7|7)\s?\d{3}\s?\d{3}-?\d{2}-?\d{2})$/
			if (!telegramRegex.test(contact.replace(/[\s\-]/g, ''))) {
				return 'Введите @username или номер телефона'
			}
		}

		return null
	}

	const formatPhoneNumber = (value: string) => {
		const digits = value.replace(/\D/g, '')
		let formattedDigits = digits
		if (digits.startsWith('8')) {
			formattedDigits = '7' + digits.slice(1)
		}
		if (formattedDigits && !formattedDigits.startsWith('7')) {
			formattedDigits = '7' + formattedDigits
		}
		formattedDigits = formattedDigits.slice(0, 11)

		if (formattedDigits.length >= 1) {
			let formatted = '+7'
			if (formattedDigits.length > 1) {
				formatted += ' ' + formattedDigits.slice(1, 4)
			}
			if (formattedDigits.length > 4) {
				formatted += ' ' + formattedDigits.slice(4, 7)
			}
			if (formattedDigits.length > 7) {
				formatted += '-' + formattedDigits.slice(7, 9)
			}
			if (formattedDigits.length > 9) {
				formatted += '-' + formattedDigits.slice(9, 11)
			}
			return formatted
		}

		return '+7 '
	}

	const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value

		if (selectedMethod === 'phone' || selectedMethod === 'whatsapp') {
			value = formatPhoneNumber(value)
		}

		setContactInfo(value)
		if (error) setError('')
	}

	const renderInput = () => {
		return (
			<input
				type='text'
				value={contactInfo}
				onChange={handleContactChange}
				placeholder={getInputPlaceholder()}
				className='w-full px-6 md:px-8 py-4 md:py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none transition-all text-sm md:text-base'
				required
				disabled={isLoading}
				ref={inputRef}
			/>
		)
	}

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
				}}
			>
				{/* Confetti Animation */}
				{showConfetti && (
					<div className='fixed inset-0 z-50 pointer-events-none'>
						{[...Array(50)].map((_, i) => (
							<motion.div
								key={i}
								initial={{
									opacity: 1,
									y: -100,
									x:
										typeof window !== 'undefined'
											? Math.random() * window.innerWidth
											: Math.random() * 1200,
									rotate: 0,
									scale: 1,
								}}
								animate={{
									opacity: 0,
									y:
										typeof window !== 'undefined'
											? window.innerHeight + 100
											: 800,
									rotate: 360,
									scale: 0,
								}}
								transition={{
									duration: 3,
									delay: Math.random() * 0.5,
									ease: 'easeOut',
								}}
								className={`absolute w-3 h-3 ${
									[
										'bg-yellow-400',
										'bg-pink-400',
										'bg-blue-400',
										'bg-green-400',
										'bg-purple-400',
									][i % 5]
								} rounded-full`}
							/>
						))}
					</div>
				)}

				<Header />

				{/* Hero Section */}
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className='relative h-screen flex items-center justify-center px-4 overflow-hidden'
				>
					{/* Background Image */}
					<div className='absolute inset-0'>
						<Image
							src='/assets/case1_ph2.webp'
							alt='Дизайн интерьера квартиры в Казани - современный ремонт от REHOME'
							fill
							className='object-cover'
							priority
						/>
						<div className='absolute inset-0 bg-black/50' />
					</div>

					{/* Content */}
					<div className='relative z-10 text-center max-w-6xl mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className='mb-8'
						>
							<h1 className='text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight leading-tight'>
								ПРЕВРАЩАЕМ ИДЕИ
								<br />В РЕАЛЬНОСТЬ
							</h1>
							<p className='text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-light'>
								Создаем интерьеры, которые меняют жизнь к лучшему
								<br />
								Ремонт и дизайн квартир в Казани
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.2 }}
						>
							<motion.a
								href='#contact'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='inline-block bg-white/10 backdrop-blur-xl text-white px-12 py-5 rounded-full font-medium text-lg border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all'
							>
								Узнать стоимость проекта
							</motion.a>
						</motion.div>
					</div>
				</motion.section>

				{/* Statistics Section */}
				<section className='py-16 md:py-24 relative'>
					<div className='container mx-auto px-4 md:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-white'>
								Наши достижения
							</h2>
							<p className='text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light'>
								Реальные цифры наших проектов
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
							{[
								{
									number: '1663',
									label: 'м² отремонтировано',
									delay: 0,
									icon: '🏠',
								},
								{
									number: '18',
									label: 'завершенных проектов',
									delay: 0.1,
									icon: '✨',
								},
								{
									number: '78М₽',
									label: 'общий бюджет проектов',
									delay: 0.2,
									icon: '💰',
								},
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: stat.delay }}
									viewport={{ once: true }}
									className='group'
								>
									<div className='relative overflow-hidden rounded-3xl md:rounded-[2rem] border border-white/10 p-6 md:p-8'>
										{/* Прозрачный фон */}
										<div className='absolute inset-0 bg-white/5 backdrop-blur-xl'></div>

										{/* Контент */}
										<div className='relative z-10 text-center'>
											{/* Иконка */}
											<motion.div
												initial={{ scale: 0, rotate: -180 }}
												whileInView={{ scale: 1, rotate: 0 }}
												transition={{ duration: 0.6, delay: stat.delay + 0.1 }}
												viewport={{ once: true }}
												className='text-4xl md:text-5xl mb-4'
											>
												{stat.icon}
											</motion.div>

											{/* Число */}
											<motion.div
												initial={{ scale: 0.5, opacity: 0 }}
												whileInView={{ scale: 1, opacity: 1 }}
												transition={{ duration: 0.8, delay: stat.delay + 0.2 }}
												viewport={{ once: true }}
												className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white'
											>
												{stat.number}
											</motion.div>

											{/* Подпись */}
											<motion.p
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												transition={{ duration: 0.6, delay: stat.delay + 0.4 }}
												viewport={{ once: true }}
												className='text-sm md:text-base text-white/80 font-light leading-relaxed'
											>
												{stat.label}
											</motion.p>
										</div>

										{/* Декоративные элементы */}
										<div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full translate-x-10 -translate-y-10'></div>
										<div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/3 to-transparent rounded-full -translate-x-8 translate-y-8'></div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Services Section */}
				<section className='py-16 md:py-24 relative'>
					<div className='container mx-auto px-4 md:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white'>
								Наши услуги
							</h2>
							<p className='text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
								Полный цикл работ от идеи до реализации
							</p>
						</motion.div>

						<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
							{[
								{
									title: '3D-визуализация',
									description:
										'Создание трехмерных моделей будущих интерьеров для наглядной демонстрации клиентам и облегчения процесса согласования проекта.',
									image: '/assets/case7_ph15.webp',
								},
								{
									title: 'Авторский надзор',
									description:
										'Контроль за выполнением работ на объекте, внесение корректировок и решение возникающих вопросов для обеспечения высокого качества результата.',
									image: '/assets/case4_ph8.webp',
								},
								{
									title: 'Сервис после сдачи проекта',
									description:
										'Предоставление консультаций и поддержки после завершения проекта, помощь в уходе за интерьером и поддержание его в первоначальном виде.',
									image: '/assets/case1_ph12.webp',
								},
							].map((service, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									className='bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 group'
								>
									<div className='relative h-64 overflow-hidden'>
										<Image
											src={service.image}
											alt={service.title}
											fill
											className='object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
									</div>
									<div className='p-6 md:p-8'>
										<h3 className='text-xl md:text-2xl font-light mb-4 text-white'>
											{service.title}
										</h3>
										<p className='text-white/80 font-light leading-relaxed'>
											{service.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* About Section */}
				<section className='py-16 md:py-24 relative'>
					<div className='container mx-auto px-4 md:px-8'>
						<div className='grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
							<motion.div
								initial={{ opacity: 0, x: -40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='relative'
							>
								<div className='relative overflow-hidden rounded-3xl'>
									<Image
										src='/employee/1.jpg'
										alt='Команда REHOME - дизайнеры интерьера в Казани'
										width={600}
										height={400}
										className='w-full h-auto object-cover'
									/>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								<h2 className='text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white'>
									О НАС
								</h2>
								<p className='text-lg text-white/90 mb-6 leading-relaxed font-light'>
									Проектируем и воплощаем жилые и коммерческие интерьеры с 2020
									года. За это время мы собрали крепкую команду профессионалов и
									больших мастеров своего дела, на своем опыте построили систему
									работы с объектами и полностью оцифровали взаимодействие с
									клиентами
								</p>
								<p className='text-lg text-white/90 mb-6 leading-relaxed font-light'>
									— подробнее о нашем подходе
								</p>
								<p className='text-base text-white/80 mb-8 leading-relaxed font-light'>
									Наш продукт — стильные интерьеры и качественная реализация в
									срок под ваш бюджет
								</p>
								<motion.a
									href='/about'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-block bg-white/10 backdrop-blur-xl text-white px-10 py-4 rounded-full font-medium border border-white/30 hover:bg-white/20 transition-all'
								>
									Подробнее о команде
								</motion.a>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Portfolio Section */}
				<section className='py-16 md:py-24 relative'>
					<div className='container mx-auto px-4 md:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-12 md:mb-16'
						>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-8 text-white leading-tight'>
								Портфолио
							</h2>
							<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light px-4'>
								Реализованные проекты в Москве
							</p>
						</motion.div>

						{/* Featured Project with experience block */}
						<div className='relative mb-12 md:mb-16'>
							<div className='grid md:grid-cols-3 gap-4 md:gap-6 h-[400px] md:h-[600px]'>
								{/* Large image */}
								<div className='md:col-span-1 relative rounded-[2rem] overflow-hidden'>
									<Image
										src='/assets/case1_ph1.webp'
										alt='Современная квартира в Казани'
										fill
										className='object-cover'
									/>
								</div>

								{/* Grid of smaller images */}
								<div className='md:col-span-2 grid grid-cols-2 gap-6'>
									<div className='relative rounded-[2rem] overflow-hidden'>
										<Image
											src='/assets/case1_ph3.webp'
											alt='Дизайн гостиной'
											fill
											className='object-cover'
										/>
									</div>
									<div className='relative rounded-[2rem] overflow-hidden'>
										<Image
											src='/assets/case1_ph7.webp'
											alt='Дизайн кухни'
											fill
											className='object-cover'
										/>
									</div>
									<div className='relative rounded-[2rem] overflow-hidden'>
										<Image
											src='/assets/case1_ph12.webp'
											alt='Дизайн спальни'
											fill
											className='object-cover'
										/>
									</div>
									{/* Experience block */}
									<div className='relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center p-4 md:p-6'>
										<div className='text-center'>
											<h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight'>
												ИМЕЕМ
												<br />
												БОЛЬШОЙ ОПЫТ
											</h3>
											<p className='text-xs md:text-sm text-white/80 mb-3 md:mb-4 font-light leading-relaxed'>
												В ДИЗАЙНЕ ИНТЕРЬЕРОВ
												<br />И РЕМОНТЕ КВАРТИР
											</p>
											<div className='text-xs text-white/60 font-light'>
												REHOME STUDIO
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Portfolio Grid - 4 in a row */}
						<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-20 lg:mb-40'>
							{[
								{
									id: 2,
									image: '/assets/case2_ph1.webp',
									title: 'Детские комнаты',
								},
								{
									id: 3,
									image: '/assets/case3_ph1.webp',
									title: 'Японский стиль',
								},
								{
									id: 4,
									image: '/assets/case4_ph1.webp',
									title: 'Яркие интерьеры',
								},
								{
									id: 5,
									image: '/assets/case5_ph1.webp',
									title: 'Современная классика',
								},
								{ id: 7, image: '/assets/case7_ph1.webp', title: 'Минимализм' },
								{
									id: 8,
									image: '/assets/case8_ph1.webp',
									title: 'Джапанди стиль',
								},
								{
									id: 9,
									image: '/assets/case9_ph1.webp',
									title: 'Эко-минимализм',
								},
								{
									id: 10,
									image: '/assets/case10_ph1.webp',
									title: 'Природные акценты',
								},
								{
									id: 11,
									image: '/assets/case11_ph1.webp',
									title: 'Лофт стиль',
								},
								{
									id: 12,
									image: '/assets/case12_ph1.webp',
									title: 'Скандинавский минимализм',
								},
								{
									id: 13,
									image: '/assets/case13_ph1.webp',
									title: 'Современная классика',
								},
								{
									id: 14,
									image: '/assets/case14_ph1.webp',
									title: 'Элегантный модерн',
								},
							].map((project, index) => (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className={`group cursor-pointer ${
										// На мобильных: первая колонка (четные индексы 0,2,4,6...) смещена вниз
										index % 2 === 0 ? 'translate-y-1/2' : ''
									} ${
										// На десктопе: каждый второй элемент (1,3,5,7...) смещен вниз, отменяем мобильную логику
										(index + 1) % 2 === 0
											? 'lg:translate-y-1/2'
											: 'lg:translate-y-0'
									}`}
								>
									<Link href={`/portfolio/${project.id}`}>
										<div className='relative overflow-hidden rounded-3xl md:rounded-[2rem] aspect-square'>
											<Image
												src={project.image}
												alt={project.title}
												fill
												className='object-cover'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0' />
											<div className='absolute bottom-3 left-3 right-3 opacity-0'>
												<h3 className='text-white font-medium text-sm md:text-base'>
													{project.title}
												</h3>
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
							className='text-center mt-[276px]'
						>
							<motion.a
								href='/portfolio'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='inline-block bg-white/10 backdrop-blur-xl text-white px-12 py-5 rounded-full font-medium border border-white/30 hover:bg-white/20 transition-all'
							>
								Все проекты
							</motion.a>
						</motion.div>
					</div>
				</section>

				{/* Contact Section */}
				<section id='contact' className='py-16 md:py-24 relative'>
					<div className='container mx-auto px-4 md:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white'>
								Обсудим ваш проект
							</h2>
							<p className='text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
								Оставьте заявку и мы свяжемся с вами в течение часа
							</p>
						</motion.div>

						<div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
							{/* Contact Form */}
							<motion.div
								initial={{ opacity: 0, x: -40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/20 p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
							>
								{isSubmitted ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										className='text-center py-8'
									>
										<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
											<span className='text-2xl'>✅</span>
										</div>
										<h3 className='text-xl font-light mb-4 text-white'>
											Спасибо за обращение!
										</h3>
										<p className='text-white/70 text-sm'>
											Мы получили вашу заявку и свяжемся с вами в ближайшее
											время
										</p>
									</motion.div>
								) : (
									<form onSubmit={handleSubmit} className='space-y-6'>
										<div>
											<h3 className='text-xl font-light mb-6 text-white text-center'>
												Как с вами связаться?
											</h3>
											<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
												{[
													{
														id: 'whatsapp',
														label: 'WhatsApp',
														icon: '📱',
														color: 'from-green-500/20 to-green-600/20',
													},
													{
														id: 'telegram',
														label: 'Telegram',
														icon: '✈️',
														color: 'from-blue-500/20 to-blue-600/20',
													},
													{
														id: 'phone',
														label: 'Телефон',
														icon: '📞',
														color: 'from-purple-500/20 to-purple-600/20',
													},
												].map(method => (
													<motion.button
														key={method.id}
														type='button'
														onClick={() => setSelectedMethod(method.id)}
														whileHover={{ scale: 1.02, y: -2 }}
														whileTap={{ scale: 0.98 }}
														className={`p-4 rounded-2xl border transition-all text-center ${
															selectedMethod === method.id
																? 'border-white/40 bg-gradient-to-br ' +
																  method.color
																: 'border-white/20 bg-white/5 hover:border-white/30'
														}`}
													>
														<div className='text-2xl mb-2'>{method.icon}</div>
														<div className='text-sm font-light text-white'>
															{method.label}
														</div>
													</motion.button>
												))}
											</div>
										</div>

										{selectedMethod && (
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												className='space-y-4'
											>
												<label className='block text-sm font-light text-white/80'>
													{getInputLabel()}
												</label>
												{renderInput()}
											</motion.div>
										)}

										{error && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												className='bg-red-500/20 border border-red-500/30 rounded-2xl p-4 text-red-300 text-sm'
											>
												{error}
											</motion.div>
										)}

										<motion.button
											type='submit'
											disabled={!selectedMethod || !contactInfo || isLoading}
											whileHover={
												selectedMethod && contactInfo && !isLoading
													? { scale: 1.02, y: -2 }
													: {}
											}
											whileTap={
												selectedMethod && contactInfo && !isLoading
													? { scale: 0.98 }
													: {}
											}
											className={`w-full py-5 rounded-full font-medium transition-all ${
												selectedMethod && contactInfo && !isLoading
													? 'bg-white text-black hover:bg-gray-100 shadow-[0_8px_32px_rgba(255,255,255,0.3)]'
													: 'bg-white/20 text-white/50 cursor-not-allowed'
											}`}
										>
											{isLoading ? 'Отправляем...' : 'Отправить заявку'}
										</motion.button>
									</form>
								)}
							</motion.div>

							{/* Contact Info & Map */}
							<motion.div
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
								className='space-y-8'
							>
								{/* Social Links */}
								<div className='flex space-x-6 text-white/60'>
									<a
										href='https://t.me/m_ilya31'
										target='_blank'
										rel='noopener noreferrer'
										className='hover:text-white transition-colors'
									>
										TELEGRAM
									</a>
									<a
										href='https://wa.me/79274394355'
										target='_blank'
										rel='noopener noreferrer'
										className='hover:text-white transition-colors'
									>
										WHATSAPP
									</a>
									<a
										href='tel:+79274394355'
										className='hover:text-white transition-colors'
									>
										ЗВОНОК
									</a>
								</div>

								{/* Office Info */}
								<div>
									<h3 className='text-2xl font-light text-white mb-4'>
										ОФИС
										<br />
										МОСКВА
										<br />
										НАХИМОВСКИЙ ПР-Т 56
									</h3>
									<a
										href='tel:+79274394355'
										className='text-2xl md:text-3xl font-light text-white hover:text-white/80 transition-colors'
									>
										+7 927 439 43 55
									</a>
								</div>

								{/* Map */}
								<div className='relative h-64 rounded-[2rem] overflow-hidden bg-black'>
									<iframe
										src='https://yandex.ru/map-widget/v1/?um=constructor%3A7936c044a85417de2051a208d0dd0135890f38077acc012b5d1959c7be4c26bd&amp;source=constructor&amp;lang=ru_RU'
										width='100%'
										height='100%'
										frameBorder='0'
										className='relative z-10'
										title='Офис REHOME - Москва, Нахимовский пр-т 56'
										style={{
											filter: 'grayscale(1) invert(1)',
										}}
									></iframe>
								</div>

								{/* Documents Link */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									viewport={{ once: true }}
								>
									<a
										href='/assets/rehome_договор.docx'
										download
										className='inline-flex items-center text-white/80 hover:text-white transition-colors group'
									>
										<svg
											className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
												clipRule='evenodd'
											/>
										</svg>
										Скачать договор
									</a>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<Footer />
			</div>

			{/* Fixed Chat Widget */}
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
		</>
	)
}
