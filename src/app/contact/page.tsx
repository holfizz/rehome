'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

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

export default function Contact() {
	const [selectedMethod, setSelectedMethod] = useState('')
	const [contactInfo, setContactInfo] = useState('')
	const [showConfetti, setShowConfetti] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!selectedMethod || !contactInfo) return

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
	}

	const getInputPlaceholder = () => {
		switch (selectedMethod) {
			case 'whatsapp':
				return '+7 (999) 123-45-67'
			case 'telegram':
				return '@username или +7 (999) 123-45-67'
			case 'phone':
				return '+7 (999) 123-45-67'
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

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
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

			{/* Liquid Glass Header */}
			<motion.header
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
				className='fixed top-4 left-4 right-4 z-40 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
			>
				<div className='flex items-center justify-between px-8 md:px-12 py-4 md:py-5'>
					<motion.a
						href='/'
						whileHover={{ scale: 1.02 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
						className='flex items-center space-x-4'
					>
						<div className='w-10 h-10 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30'>
							<span className='text-white font-light text-lg'>R</span>
						</div>
						<span className='text-2xl md:text-3xl font-extralight tracking-[0.02em] text-white/95'>
							REHOME
						</span>
					</motion.a>

					<nav className='hidden md:flex items-center space-x-8'>
						<motion.a
							href='/portfolio'
							whileHover={{ y: -1 }}
							className='text-sm font-light text-white/80 hover:text-white transition-colors'
						>
							Портфолио
						</motion.a>
						<motion.a
							href='/services'
							whileHover={{ y: -1 }}
							className='text-sm font-light text-white/80 hover:text-white transition-colors'
						>
							Услуги
						</motion.a>
						<motion.a
							href='/contact'
							whileHover={{ y: -1 }}
							className='text-sm font-light text-white transition-colors'
						>
							Контакты
						</motion.a>
					</nav>

					<motion.a
						href='https://t.me/holfizz'
						target='_blank'
						rel='noopener noreferrer'
						whileHover={{ scale: 1.02, y: -1 }}
						className='hidden md:block bg-white/15 backdrop-blur-xl text-white px-6 py-2.5 rounded-full text-sm font-light border border-white/20 hover:bg-white/20 transition-all'
					>
						Обсудить
					</motion.a>
				</div>
			</motion.header>

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80'
						alt='Contact background'
						fill
						className='object-cover opacity-20'
					/>
					<div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80' />
				</div>

				<div className='relative z-10 container mx-auto px-6 text-center max-w-4xl'>
					<motion.h1
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-5xl md:text-7xl lg:text-8xl font-thin mb-8 tracking-tighter'
					>
						СВЯЗАТЬСЯ
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed'
					>
						Выберите удобный способ связи и оставьте свои контакты
					</motion.p>
				</div>
			</section>

			{/* Contact Form Section */}
			<motion.section
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={stagger}
				className='py-20 md:py-32 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-700 relative overflow-hidden'
			>
				<div className='absolute top-10 left-20 w-72 h-72 bg-stone-700/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-10 right-20 w-64 h-64 bg-neutral-600/5 rounded-full blur-3xl animate-pulse delay-700' />

				<div className='container mx-auto px-6 max-w-2xl relative z-10'>
					{!isSubmitted ? (
						<motion.div
							variants={scaleIn}
							className='bg-white/8 backdrop-blur-3xl rounded-[3rem] border border-white/20 p-8 md:p-12 shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative overflow-hidden'
						>
							<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[3rem] pointer-events-none' />

							<div className='relative z-10'>
								<h2 className='text-3xl md:text-4xl font-light text-center mb-8 text-white'>
									Выберите способ связи
								</h2>

								{/* Contact Method Selection */}
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
									<motion.button
										onClick={() => setSelectedMethod('whatsapp')}
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className={`p-6 rounded-2xl border transition-all ${
											selectedMethod === 'whatsapp'
												? 'bg-green-500/20 border-green-400/50 text-green-300'
												: 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30'
										}`}
									>
										<div className='flex flex-col items-center space-y-3'>
											<svg
												className='w-8 h-8'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487z' />
											</svg>
											<span className='text-sm font-medium'>WhatsApp</span>
										</div>
									</motion.button>

									<motion.button
										onClick={() => setSelectedMethod('telegram')}
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className={`p-6 rounded-2xl border transition-all ${
											selectedMethod === 'telegram'
												? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
												: 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30'
										}`}
									>
										<div className='flex flex-col items-center space-y-3'>
											<svg
												className='w-8 h-8'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
											</svg>
											<span className='text-sm font-medium'>Telegram</span>
										</div>
									</motion.button>

									<motion.button
										onClick={() => setSelectedMethod('phone')}
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className={`p-6 rounded-2xl border transition-all ${
											selectedMethod === 'phone'
												? 'bg-purple-500/20 border-purple-400/50 text-purple-300'
												: 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30'
										}`}
									>
										<div className='flex flex-col items-center space-y-3'>
											<svg
												className='w-8 h-8'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
											</svg>
											<span className='text-sm font-medium'>Телефон</span>
										</div>
									</motion.button>
								</div>

								{/* Contact Input */}
								<form onSubmit={handleSubmit} className='space-y-6'>
									<div>
										<label className='block text-white/80 text-sm font-light mb-3'>
											{getInputLabel()}
										</label>
										<input
											type='text'
											value={contactInfo}
											onChange={e => setContactInfo(e.target.value)}
											className='w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all'
											placeholder={getInputPlaceholder()}
											required
											disabled={!selectedMethod}
										/>
									</div>

									<motion.button
										type='submit'
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										disabled={!selectedMethod || !contactInfo}
										className='w-full bg-white/15 backdrop-blur-xl text-white py-4 md:py-5 rounded-2xl text-lg font-light border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
									>
										<span className='relative z-10'>Отправить контакты</span>
										<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl' />
									</motion.button>
								</form>
							</div>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className='bg-white/8 backdrop-blur-3xl rounded-[3rem] border border-white/20 p-8 md:p-12 shadow-[0_8px_32px_rgba(255,255,255,0.1)] text-center'
						>
							<div className='text-6xl mb-6'>🎉</div>
							<h3 className='text-3xl font-light text-white mb-4'>Спасибо!</h3>
							<p className='text-white/70 text-lg'>
								Ваши контакты отправлены. Мы свяжемся с вами в ближайшее время!
							</p>
						</motion.div>
					)}
				</div>
			</motion.section>

			{/* Quick Contact Cards */}
			<motion.section
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={stagger}
				className='py-20 md:py-32 bg-gradient-to-br from-stone-200 via-amber-100 to-stone-100'
			>
				<div className='container mx-auto px-6 max-w-6xl'>
					<motion.h2
						variants={fadeInUp}
						className='text-4xl md:text-6xl font-thin text-center mb-16 tracking-tighter text-stone-800'
					>
						ПРЯМАЯ СВЯЗЬ
					</motion.h2>
					<motion.h4
						variants={fadeInUp}
						className='text-xl md:text-2xl font-thin text-center mb-16  text-stone-800'
					>
						Нажмите на квадратик и напишите нам:)
					</motion.h4>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						<motion.a
							href='tel:88002228569'
							variants={scaleIn}
							whileHover={{ scale: 1.02, y: -4 }}
							className='bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all shadow-lg'
						>
							<div className='w-16 h-16 bg-stone-800 rounded-2xl mx-auto mb-6 flex items-center justify-center'>
								<svg
									className='w-8 h-8 text-white'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-stone-800 mb-2 text-center'>
								Телефон
							</h3>
							<p className='text-stone-700 text-center'>8 800 222-85-69</p>
						</motion.a>

						<motion.a
							href='mailto:hello@rehome.studio'
							variants={scaleIn}
							whileHover={{ scale: 1.02, y: -4 }}
							className='bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all shadow-lg'
						>
							<div className='w-16 h-16 bg-stone-800 rounded-2xl mx-auto mb-6 flex items-center justify-center'>
								<svg
									className='w-8 h-8 text-white'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-stone-800 mb-2 text-center'>
								Email
							</h3>
							<p className='text-stone-700 text-center'>hello@rehome.studio</p>
						</motion.a>

						<motion.a
							href='https://t.me/holfizz'
							target='_blank'
							rel='noopener noreferrer'
							variants={scaleIn}
							whileHover={{ scale: 1.02, y: -4 }}
							className='bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all shadow-lg'
						>
							<div className='w-16 h-16 bg-stone-800 rounded-2xl mx-auto mb-6 flex items-center justify-center'>
								<svg
									className='w-8 h-8 text-white'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-stone-800 mb-2 text-center'>
								Telegram
							</h3>
							<p className='text-stone-700 text-center'>@holfizz</p>
						</motion.a>
					</div>
				</div>
			</motion.section>

			{/* Footer */}
			<motion.footer
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={fadeInUp}
				className='py-16 md:py-20 bg-gradient-to-t from-stone-900 via-neutral-900 to-stone-800 border-t border-white/10'
			>
				<div className='container mx-auto px-6 text-center'>
					<div className='flex flex-col items-center space-y-8'>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10'
						>
							<div className='w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30'>
								<span className='text-white font-light text-xl'>R</span>
							</div>
							<span className='text-3xl font-extralight tracking-tight text-white/95'>
								REHOME
							</span>
						</motion.div>

						<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
							<motion.a
								href='tel:88002228569'
								whileHover={{ scale: 1.02, y: -1 }}
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<svg
									className='w-5 h-5 text-white/70'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
								</svg>
								<span className='text-white/80 font-light'>
									8 800 222-85-69
								</span>
							</motion.a>

							<motion.a
								href='mailto:hello@rehome.studio'
								whileHover={{ scale: 1.02, y: -1 }}
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<svg
									className='w-5 h-5 text-white/70'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
								</svg>
								<span className='text-white/80 font-light'>
									hello@rehome.studio
								</span>
							</motion.a>

							<motion.a
								href='https://t.me/holfizz'
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.02, y: -1 }}
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<svg
									className='w-5 h-5 text-white/70'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
								</svg>
								<span className='text-white/80 font-light'>@holfizz</span>
							</motion.a>
						</div>

						<div className='text-white/50 text-lg font-light bg-white/5 backdrop-blur-xl rounded-full px-8 py-3 border border-white/10'>
							© 2025 REHOME. Дизайн интерьеров.
						</div>
					</div>
				</div>
			</motion.footer>

			{/* Floating Telegram Button */}
			<motion.div
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
				className='fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50'
			>
				<motion.a
					href='https://t.me/holfizz'
					target='_blank'
					rel='noopener noreferrer'
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					className='bg-white/15 backdrop-blur-3xl text-white w-16 md:w-18 h-16 md:h-18 rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)] block'
				>
					<svg
						className='w-7 md:w-8 h-7 md:h-8'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
					</svg>
				</motion.a>
			</motion.div>
		</div>
	)
}
