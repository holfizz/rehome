'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '../../components/Header'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

const projects = [
	{
		id: 1,
		title: 'Современная квартира',
		location: 'Казань, ЖК "Солнечный"',
		area: '85 м²',
		year: '2024',
		style: 'Минимализм',
		image:
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Современная квартира в стиле минимализм с акцентом на функциональность и комфорт.',
	},
	{
		id: 2,
		title: 'Загородный дом',
		location: 'Казань, коттеджный поселок',
		area: '180 м²',
		year: '2024',
		style: 'Скандинавский',
		image:
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Уютный загородный дом в скандинавском стиле с натуральными материалами.',
	},
	{
		id: 3,
		title: 'Студия в центре',
		location: 'Казань, центр города',
		area: '45 м²',
		year: '2023',
		style: 'Лофт',
		image:
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Компактная студия в стиле лофт с максимальным использованием пространства.',
	},
	{
		id: 4,
		title: 'Семейная квартира',
		location: 'Казань, Приволжский район',
		area: '120 м²',
		year: '2023',
		style: 'Современная классика',
		image:
			'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Элегантная семейная квартира с элементами классики и современными решениями.',
	},
	{
		id: 5,
		title: 'Пентхаус',
		location: 'Казань, элитный район',
		area: '250 м²',
		year: '2024',
		style: 'Luxury',
		image:
			'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Роскошный пентхаус с панорамными окнами и премиальными материалами.',
	},
	{
		id: 6,
		title: 'Офисное пространство',
		location: 'Казань, бизнес-центр',
		area: '300 м²',
		year: '2023',
		style: 'Корпоративный',
		image:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
		images: [
			'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80',
		],
		description:
			'Современное офисное пространство с зонированием и эргономичными решениями.',
	},
]

export default function Portfolio() {
	return (
		<div
			className='min-h-screen bg-black text-white overflow-x-hidden'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
			}}
		>
			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&q=80'
						alt='Portfolio background'
						fill
						className='object-cover opacity-20'
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
						Портфолио
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Каждый проект — это уникальная история создания идеального
						пространства для жизни
					</motion.p>
				</div>
			</section>

			{/* Projects Grid */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{projects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -10, scale: 1.02 }}
								className='group cursor-pointer'
							>
								<div className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 hover:border-white/20 transition-all overflow-hidden'>
									<div className='relative overflow-hidden'>
										<Image
											src={project.image}
											alt={project.title}
											width={400}
											height={300}
											className='w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500' />
										<div className='absolute top-4 right-4 bg-white/20 backdrop-blur-xl rounded-full px-3 py-1 text-xs font-light text-white'>
											{project.year}
										</div>
									</div>
									<div className='p-6 md:p-8'>
										<div className='flex items-center justify-between mb-3'>
											<h3 className='text-lg md:text-xl font-light text-white'>
												{project.title}
											</h3>
											<span className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full'>
												{project.area}
											</span>
										</div>
										<p className='text-sm text-white/70 mb-3'>
											{project.location}
										</p>
										<p className='text-sm text-white/80 mb-4 leading-relaxed'>
											{project.description}
										</p>
										<div className='flex items-center justify-between'>
											<span className='text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full'>
												{project.style}
											</span>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className='text-xs text-white/80 hover:text-white transition-colors'
											>
												Подробнее →
											</motion.button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-800 via-neutral-800 to-stone-800' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center max-w-4xl mx-auto'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Хотите такой же проект?
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Обсудим ваши идеи и создадим уникальное пространство специально
							для вас
						</p>

						<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
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
								href='https://t.me/holfizz'
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-white/10 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-light text-sm md:text-base border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto text-center'
							>
								Обсудить в Telegram
							</motion.a>
						</div>
					</motion.div>
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
