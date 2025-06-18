'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

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

const projects = [
	{
		id: 1,
		title: 'Минималистичная квартира',
		location: 'Москва',
		area: '85 м²',
		style: 'Минимализм',
		year: '2024',
		description:
			'Современная квартира в стиле минимализм с акцентом на функциональность и чистоту линий.',
		images: [
			'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Минимализм', 'Белый', 'Дерево', 'Функциональность'],
	},
	{
		id: 2,
		title: 'Современная студия',
		location: 'Санкт-Петербург',
		area: '120 м²',
		style: 'Современный',
		year: '2024',
		description:
			'Открытое пространство с элементами лофта и современными технологиями.',
		images: [
			'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Лофт', 'Открытое пространство', 'Технологии', 'Серый'],
	},
	{
		id: 3,
		title: 'Семейный дом',
		location: 'Москва',
		area: '95 м²',
		style: 'Скандинавский',
		year: '2023',
		description:
			'Уютный семейный дом в скандинавском стиле с натуральными материалами.',
		images: [
			'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Скандинавский', 'Дерево', 'Уют', 'Семейный'],
	},
	{
		id: 4,
		title: 'Лофт в центре',
		location: 'Санкт-Петербург',
		area: '65 м²',
		style: 'Лофт',
		year: '2023',
		description:
			'Стильный лофт с высокими потолками и индустриальными элементами.',
		images: [
			'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Лофт', 'Кирпич', 'Металл', 'Индустриальный'],
	},
	{
		id: 5,
		title: 'Элитная квартира',
		location: 'Москва',
		area: '150 м²',
		style: 'Неоклассика',
		year: '2024',
		description:
			'Роскошная квартира в стиле неоклассика с дорогими материалами.',
		images: [
			'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Неоклассика', 'Роскошь', 'Мрамор', 'Золото'],
	},
	{
		id: 6,
		title: 'Молодежная студия',
		location: 'Санкт-Петербург',
		area: '45 м²',
		style: 'Современный',
		year: '2023',
		description:
			'Компактная студия для молодой пары с умными решениями хранения.',
		images: [
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
		],
		tags: ['Компактность', 'Хранение', 'Молодежный', 'Яркие акценты'],
	},
]

export default function Portfolio() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
				className='fixed top-4 left-4 right-4 z-50 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
			>
				<div className='flex items-center justify-between px-8 md:px-12 py-4 md:py-5'>
					<Link href='/' className='flex items-center space-x-4'>
						<div className='w-10 h-10 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30'>
							<span className='text-white font-light text-lg'>R</span>
						</div>
						<span className='text-2xl md:text-3xl font-extralight tracking-[0.02em] text-white/95'>
							REHOME
						</span>
					</Link>

					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='/'
							className='text-sm font-light text-white/80 hover:text-white transition-colors'
						>
							Главная
						</Link>
						<Link
							href='/portfolio'
							className='text-sm font-light text-white transition-colors'
						>
							Портфолио
						</Link>
						<Link
							href='/services'
							className='text-sm font-light text-white/80 hover:text-white transition-colors'
						>
							Услуги
						</Link>
						<Link
							href='/contact'
							className='text-sm font-light text-white/80 hover:text-white transition-colors'
						>
							Контакты
						</Link>
					</nav>

					<motion.a
						href='https://t.me/holfizz'
						target='_blank'
						rel='noopener noreferrer'
						whileHover={{ scale: 1.02, y: -1 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
						className='hidden md:block bg-white/15 backdrop-blur-xl text-white px-6 py-2.5 rounded-full text-sm font-light border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all'
					>
						Обсудить
					</motion.a>
				</div>
			</motion.header>

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80'
						alt='Portfolio background'
						fill
						className='object-cover opacity-20'
					/>
					<div className='absolute inset-0 bg-black/60' />
				</div>

				<div className='relative z-10 container mx-auto px-6 text-center max-w-4xl'>
					<motion.h1
						initial={{ opacity: 0, y: 60 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
						className='text-5xl md:text-7xl lg:text-8xl font-thin mb-8 tracking-tighter text-white'
					>
						ПОРТФОЛИО
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className='text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed'
					>
						Наши лучшие проекты в области дизайна интерьеров
					</motion.p>
				</div>
			</section>

			{/* Projects Grid */}
			<motion.section
				ref={ref}
				initial='initial'
				animate={isInView ? 'animate' : 'initial'}
				variants={stagger}
				className='py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black'
			>
				<div className='container mx-auto px-6 max-w-7xl'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'>
						{projects.map(project => (
							<motion.div
								key={project.id}
								variants={scaleIn}
								whileHover={{ scale: 1.02, y: -8 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='group cursor-pointer'
							>
								<div className='bg-white/8 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/12 hover:border-white/30 transition-all duration-300 overflow-hidden'>
									<div className='relative h-64 md:h-80 overflow-hidden'>
										<Image
											src={project.images[0]}
											alt={project.title}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
										<div className='absolute top-4 right-4 bg-white/20 backdrop-blur-xl rounded-full px-3 py-1 text-xs text-white border border-white/30'>
											{project.year}
										</div>
									</div>

									<div className='p-6 md:p-8'>
										<div className='flex items-center justify-between mb-4'>
											<h3 className='text-xl md:text-2xl font-semibold text-white'>
												{project.title}
											</h3>
											<div className='text-white/60 text-sm'>
												{project.area}
											</div>
										</div>

										<div className='flex items-center text-white/70 text-sm mb-4'>
											<svg
												className='w-4 h-4 mr-2'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
											</svg>
											{project.location}
										</div>

										<p className='text-white/70 text-sm mb-6 leading-relaxed'>
											{project.description}
										</p>

										<div className='flex flex-wrap gap-2 mb-6'>
											{project.tags.map((tag, tagIndex) => (
												<span
													key={tagIndex}
													className='bg-white/10 backdrop-blur-xl text-white/80 px-3 py-1 rounded-full text-xs border border-white/20'
												>
													{tag}
												</span>
											))}
										</div>

										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className='w-full bg-white/10 backdrop-blur-xl text-white py-3 rounded-2xl text-sm font-light border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all'
										>
											Подробнее
										</motion.button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* CTA Section */}
			<motion.section
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={fadeInUp}
				className='py-20 md:py-32 bg-gradient-to-br from-black via-slate-800 to-black text-center'
			>
				<div className='container mx-auto px-6 max-w-4xl'>
					<h2 className='text-4xl md:text-6xl font-thin mb-8 tracking-tighter text-white'>
						ГОТОВЫ НАЧАТЬ?
					</h2>
					<p className='text-xl text-white/80 mb-12 font-light'>
						Создадим уникальный дизайн специально для вас
					</p>
					<Link href='/contact'>
						<motion.button
							whileHover={{ scale: 1.02, y: -2 }}
							whileTap={{ scale: 0.98 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
							className='bg-white/15 backdrop-blur-xl text-white px-12 py-4 rounded-3xl text-lg font-light border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
						>
							Обсудить проект
						</motion.button>
					</Link>
				</div>
			</motion.section>

			{/* Footer */}
			<motion.footer
				initial='initial'
				whileInView='animate'
				viewport={{ once: true }}
				variants={fadeInUp}
				className='py-16 bg-gradient-to-t from-black via-gray-950 to-black border-t border-white/10'
			>
				<div className='container mx-auto px-6'>
					<div className='flex flex-col items-center justify-center text-center space-y-8'>
						<Link href='/' className='flex items-center space-x-4'>
							<div className='w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30'>
								<span className='text-white font-light text-xl'>R</span>
							</div>
							<span className='text-3xl font-extralight tracking-tight text-white/95'>
								REHOME
							</span>
						</Link>

						<div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8'>
							<a
								href='tel:88002228569'
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<span className='text-white/80 font-light'>
									8 800 222-85-69
								</span>
							</a>
							<a
								href='mailto:hello@rehome.studio'
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<span className='text-white/80 font-light'>
									hello@rehome.studio
								</span>
							</a>
							<a
								href='https://t.me/holfizz'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all'
							>
								<span className='text-white/80 font-light'>@holfizz</span>
							</a>
						</div>

						<div className='text-white/50 text-lg font-light'>
							© 2025 REHOME. Дизайн интерьеров.
						</div>
					</div>
				</div>
			</motion.footer>
		</div>
	)
}
