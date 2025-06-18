'use client'

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
					className='relative z-20 text-center max-w-5xl mx-auto px-4 md:px-8'
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
									Создаем пространства, которые вдохновляют жить
								</h2>
								<p className='text-sm md:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed px-4'>
									Каждый проект — это история о том, как дом становится
									отражением вашей души. Мы создаем не просто интерьеры, а
									атмосферу для жизни.
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

			{/* About Section */}
			<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
				{/* Background with subtle pattern */}
				<div className='absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black' />
				<div
					className='absolute inset-0 opacity-5'
					style={{
						backgroundImage:
							'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
						backgroundSize: '40px 40px',
					}}
				/>

				<div className='container mx-auto px-4 md:px-8 relative z-10'>
					<motion.div
						ref={ref}
						variants={stagger}
						initial='initial'
						animate={isInView ? 'animate' : 'initial'}
						className='max-w-6xl mx-auto'
					>
						<motion.div
							variants={fadeInUp}
							className='text-center mb-12 md:mb-20'
						>
							<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
								О студии
							</span>
							<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
								Философия пространства
							</h2>
							<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
								Мы верим, что дом — это не просто место, где вы живете. Это
								пространство, которое формирует ваше настроение, вдохновляет на
								новые свершения и дарит ощущение гармонии каждый день.
							</p>
						</motion.div>

						<div className='grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
							<motion.div
								variants={fadeInUp}
								className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-white/10 hover:border-white/20 transition-all group'
							>
								<div className='w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/15 transition-all'>
									<span className='text-xl md:text-2xl'>✨</span>
								</div>
								<h3 className='text-xl md:text-2xl font-light mb-4 text-white'>
									Индивидуальный подход
								</h3>
								<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
									Каждый проект начинается с глубокого понимания вашего образа
									жизни, предпочтений и мечтаний. Мы создаем уникальные решения,
									которые отражают именно вашу личность.
								</p>
							</motion.div>

							<motion.div
								variants={fadeInUp}
								className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-white/10 hover:border-white/20 transition-all group'
							>
								<div className='w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/15 transition-all'>
									<span className='text-xl md:text-2xl'>🎨</span>
								</div>
								<h3 className='text-xl md:text-2xl font-light mb-4 text-white'>
									Современные решения
								</h3>
								<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
									Используем передовые технологии и материалы, следим за
									мировыми трендами, но всегда помним о функциональности и
									комфорте в повседневной жизни.
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Services Section */}
			<section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
				{/* Background */}
				<div className='absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-yellow-900/20' />

				<div className='container mx-auto px-4 md:px-8 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center mb-12 md:mb-20'
					>
						<span className='text-xs md:text-sm text-white/60 font-light tracking-[0.2em] uppercase mb-4 block'>
							Услуги
						</span>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Что мы делаем
						</h2>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{[
							{
								title: 'Дизайн-проект',
								description:
									'Полный дизайн-проект с 3D-визуализацией, чертежами и спецификациями',
								icon: '📐',
							},
							{
								title: 'Авторский надзор',
								description:
									'Контроль качества выполнения работ и соответствия проекту',
								icon: '👁️',
							},
							{
								title: 'Подбор мебели',
								description:
									'Комплектация интерьера мебелью, декором и аксессуарами',
								icon: '🪑',
							},
							{
								title: 'Перепланировка',
								description:
									'Оптимизация пространства с учетом всех строительных норм',
								icon: '🏗️',
							},
							{
								title: '3D-визуализация',
								description: 'Фотореалистичные изображения будущего интерьера',
								icon: '🎬',
							},
							{
								title: 'Консультации',
								description:
									'Экспертные советы по дизайну и организации пространства',
								icon: '💡',
							},
						].map((service, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -5, scale: 1.02 }}
								className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all group cursor-pointer'
							>
								<div className='w-12 h-12 md:w-16 md:h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-all'>
									<span className='text-xl md:text-2xl'>{service.icon}</span>
								</div>
								<h3 className='text-lg md:text-xl font-light mb-3 md:mb-4 text-white'>
									{service.title}
								</h3>
								<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
									{service.description}
								</p>
							</motion.div>
						))}
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
							Наши работы
						</h2>
						<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
							Каждый проект — это уникальная история создания идеального
							пространства для жизни
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16'>
						{[
							{
								image:
									'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
								title: 'Современная квартира',
								area: '85 м²',
							},
							{
								image:
									'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
								title: 'Загородный дом',
								area: '180 м²',
							},
							{
								image:
									'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
								title: 'Студия в центре',
								area: '45 м²',
							},
						].map((project, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -10, scale: 1.02 }}
								className='group cursor-pointer'
							>
								<div className='relative overflow-hidden rounded-2xl md:rounded-3xl mb-4 md:mb-6'>
									<Image
										src={project.image}
										alt={project.title}
										width={400}
										height={300}
										className='w-full h-48 md:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500' />
								</div>
								<div className='bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 group-hover:border-white/20 transition-all'>
									<h3 className='text-base md:text-lg font-light mb-2 text-white'>
										{project.title}
									</h3>
									<p className='text-sm text-white/70'>{project.area}</p>
								</div>
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
							Начнем создавать ваш идеальный дом
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Расскажите нам о своих мечтах, и мы воплотим их в реальность
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
