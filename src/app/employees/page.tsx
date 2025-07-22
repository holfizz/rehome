'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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

// Данные сотрудников
const employees = [
	{
		id: 1,
		name: 'Руслан Гимаев',
		position: 'Маркетолог',
		age: 42,
		ageText: '42 года',
		image: '/employee/1.jpg',
	},
	{
		id: 2,
		name: 'Елена Кулакова',
		position: 'Дизайнер-архитектор',
		age: 28,
		ageText: '28 лет',
		image: '/employee/2.jpg',
	},
	{
		id: 3,
		name: 'Екатерина Горбунова',
		position: 'Дизайнер интерьеров',
		age: 27,
		ageText: '27 лет',
		image: '/employee/3.jpg',
	},
	{
		id: 4,
		name: 'Зоя Питаева',
		position: 'Финансовый директор',
		age: 41,
		ageText: '41 год',
		image: '/employee/4.jpg',
	},
	{
		id: 5,
		name: 'Кирилл Насыров',
		position: 'Маркетолог',
		age: 25,
		ageText: '25 лет',
		image: '/employee/5.jpg',
	},
]

export default function Employees() {
	return (
		<div
			className='min-h-screen bg-gradient-to-b from-amber-900 via-amber-700 to-amber-50 text-gray-900 overflow-x-hidden'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
			}}
		>
			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0'>
					{/* Decorative gradients */}
					<div className='absolute top-0 left-0 w-96 h-96 opacity-20'>
						<div className='w-full h-full bg-gradient-radial from-yellow-600/30 via-amber-500/20 to-transparent rounded-full blur-3xl'></div>
					</div>
					<div className='absolute top-1/4 right-0 w-80 h-80 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-orange-600/25 via-amber-600/15 to-transparent rounded-full blur-3xl'></div>
					</div>
					<div className='absolute bottom-0 left-1/3 w-72 h-72 opacity-15'>
						<div className='w-full h-full bg-gradient-radial from-yellow-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl'></div>
					</div>
				</div>

				<div className='relative z-10 container mx-auto px-4 md:px-6 text-center max-w-4xl'>
					<motion.h1
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-4xl md:text-6xl lg:text-7xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'
					>
						Наша команда
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Профессионалы, которые создают ваши мечты
					</motion.p>
					<motion.h2
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.4 }}
						className='text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto font-light'
					>
						Каждый член нашей команды — эксперт в своей области, объединенный
						общей целью создания идеальных интерьеров
					</motion.h2>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						variants={stagger}
						initial='initial'
						animate='animate'
						className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8'
					>
						{employees.map((employee, index) => (
							<motion.div
								key={employee.id}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -8, scale: 1.02 }}
								className='bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-amber-200/50 hover:border-amber-300/70 transition-all shadow-[0_8px_32px_rgba(245,158,11,0.1)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.15)] group'
							>
								{/* Photo */}
								<div className='relative overflow-hidden'>
									<Image
										src={employee.image}
										alt={employee.name}
										width={1091}
										height={1500}
										className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

									{/* Age badge */}
									<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-amber-200/50'>
										<span className='text-xs font-medium text-amber-900'>
											{employee.ageText}
										</span>
									</div>
								</div>

								{/* Content */}
								<div className='p-4 md:p-6'>
									<h3 className='text-lg md:text-xl font-light mb-2 text-amber-900 text-center'>
										{employee.name}
									</h3>
									<p className='text-sm md:text-base text-amber-700 font-medium text-center'>
										{employee.position}
									</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-yellow-100/50' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center max-w-4xl mx-auto'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-amber-900 tracking-[-0.02em]'>
							Готовы работать с нашей командой?
						</h2>
						<p className='text-base md:text-lg text-amber-800/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Свяжитесь с нами и познакомьтесь с командой профессионалов,
							которая воплотит ваши мечты в реальность
						</p>

						<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
							<motion.a
								href='/contact'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-amber-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-sm md:text-base hover:bg-amber-700 transition-all shadow-[0_8px_32px_rgba(245,158,11,0.3)] w-full sm:w-auto text-center'
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
								className='bg-white/80 backdrop-blur-xl text-amber-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-light text-sm md:text-base border border-amber-200/50 hover:bg-white/90 hover:border-amber-300/60 transition-all w-full sm:w-auto text-center'
							>
								Обсудить в Telegram
							</motion.a>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<Footer theme='beige' />
		</div>
	)
}
