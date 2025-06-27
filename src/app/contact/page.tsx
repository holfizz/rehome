'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Contact() {
	const [selectedMethod, setSelectedMethod] = useState('')
	const [contactInfo, setContactInfo] = useState('')
	const [showConfetti, setShowConfetti] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	// Автофокус при выборе метода связи
	useEffect(() => {
		if (selectedMethod && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 300) // Небольшая задержка для анимации
		}
	}, [selectedMethod])

	// Автоматически устанавливаем +7 для телефонных полей
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

		// Валидация перед отправкой
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
				// Показываем конфетти
				setShowConfetti(true)
				setIsSubmitted(true)

				// Убираем конфетти через 3 секунды
				setTimeout(() => {
					setShowConfetti(false)
				}, 3000)

				// Сбрасываем форму через 5 секунд
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

	// Валидация контактной информации
	const validateContact = (contact: string, method: string) => {
		if (!contact.trim()) return 'Поле не может быть пустым'

		if (method === 'phone' || method === 'whatsapp') {
			// Убираем все символы кроме цифр
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

	// Форматирование номера телефона
	const formatPhoneNumber = (value: string) => {
		// Убираем все символы кроме цифр
		const digits = value.replace(/\D/g, '')

		// Если пользователь начал вводить с 8, заменяем на 7
		let formattedDigits = digits
		if (digits.startsWith('8')) {
			formattedDigits = '7' + digits.slice(1)
		}

		// Если номер не начинается с 7, добавляем 7 в начало
		if (formattedDigits && !formattedDigits.startsWith('7')) {
			formattedDigits = '7' + formattedDigits
		}

		// Ограничиваем до 11 цифр
		formattedDigits = formattedDigits.slice(0, 11)

		// Форматируем в +7 999 999-99-99
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

		// Применяем форматирование только для телефонов
		if (selectedMethod === 'phone' || selectedMethod === 'whatsapp') {
			value = formatPhoneNumber(value)
		}

		setContactInfo(value)
		if (error) setError('') // Очищаем ошибку при изменении
	}

	// Компонент для рендеринга input
	const renderInput = () => {
		return (
			<input
				type='text'
				value={contactInfo}
				onChange={handleContactChange}
				placeholder={getInputPlaceholder()}
				className='w-full px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none transition-all text-sm md:text-base'
				required
				disabled={isLoading}
				ref={inputRef}
			/>
		)
	}

	return (
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
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/assets/case1_ph2.webp'
						alt='Contact background'
						fill
						className='object-cover opacity-20'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80' />
				</div>

				<div className='relative z-10 container mx-auto px-4 md:px-6 text-center max-w-4xl'>
					<motion.h1
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-4xl md:text-6xl lg:text-7xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'
					>
						Свяжитесь с нами
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-lg md:text-xl text-white/80 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Готовы обсудить ваш проект? Выберите удобный способ связи
					</motion.p>
					<motion.h2
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.4 }}
						className='text-base md:text-lg text-white/90 max-w-3xl mx-auto font-light'
					>
						Не завершаем проект, пока всё не будет на 100% как вы мечтали
					</motion.h2>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6 max-w-2xl'>
					<motion.div
						variants={scaleIn}
						initial='initial'
						animate='animate'
						className='bg-white/5 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 p-6 md:p-8 lg:p-12 shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
					>
						{isSubmitted ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								className='text-center py-8 md:py-12'
							>
								<div className='w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
									<span className='text-2xl md:text-3xl'>✅</span>
								</div>
								<h3 className='text-xl md:text-2xl font-light mb-4 text-white'>
									Спасибо за обращение!
								</h3>
								<p className='text-white/70 text-sm md:text-base'>
									Мы получили вашу заявку и свяжемся с вами в ближайшее время
								</p>
							</motion.div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-6 md:space-y-8'>
								<div>
									<h3 className='text-xl md:text-2xl font-light mb-6 text-white text-center'>
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
												className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all text-center ${
													selectedMethod === method.id
														? 'border-white/40 bg-gradient-to-br ' +
														  method.color
														: 'border-white/20 bg-white/5 hover:border-white/30'
												}`}
											>
												<div className='text-2xl md:text-3xl mb-2'>
													{method.icon}
												</div>
												<div className='text-sm md:text-base font-light text-white'>
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
										className='bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm'
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
									className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm md:text-base transition-all ${
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
				</div>
			</section>

			{/* Additional Contact Info */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto'>
						{[
							{
								icon: '📍',
								title: 'Адрес',
								content: 'Казань, Россия',
								description: 'Работаем по всему городу',
							},
							{
								icon: '⏰',
								title: 'Время работы',
								content: 'Пн-Пт: 9:00-18:00',
								description: 'Сб-Вс: по договоренности',
							},
							{
								icon: '💬',
								title: 'Консультация',
								content: 'Бесплатно',
								description: 'Первая встреча - бесплатно',
							},
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className='bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10 text-center hover:border-white/20 transition-all'
							>
								<div className='text-3xl md:text-4xl mb-4'>{item.icon}</div>
								<h3 className='text-lg md:text-xl font-light mb-2 text-white'>
									{item.title}
								</h3>
								<p className='text-white/90 mb-2 text-sm md:text-base font-medium'>
									{item.content}
								</p>
								<p className='text-xs md:text-sm text-white/60'>
									{item.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='py-8 md:py-12 border-t border-white/10'>
				<div className='container mx-auto px-4 md:px-6'>
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
