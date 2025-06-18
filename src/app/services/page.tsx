'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '../../components/Header'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

const services = [
	{
		id: 1,
		title: 'Дизайн-проект',
		description:
			'Полный дизайн-проект с 3D-визуализацией, чертежами и спецификациями',
		icon: '📐',
		features: [
			'Планировочные решения',
			'3D-визуализация',
			'Рабочие чертежи',
			'Спецификация материалов',
			'Авторский надзор',
		],
		price: 'от 2 500 ₽/м²',
		duration: '30-45 дней',
	},
	{
		id: 2,
		title: 'Авторский надзор',
		description: 'Контроль качества выполнения работ и соответствия проекту',
		icon: '👁️',
		features: [
			'Контроль качества работ',
			'Соответствие проекту',
			'Консультации подрядчиков',
			'Промежуточные осмотры',
			'Итоговая приемка',
		],
		price: 'от 15 000 ₽/выезд',
		duration: 'весь период ремонта',
	},
	{
		id: 3,
		title: 'Подбор мебели',
		description: 'Комплектация интерьера мебелью, декором и аксессуарами',
		icon: '🪑',
		features: [
			'Подбор мебели',
			'Декор и аксессуары',
			'Текстиль',
			'Освещение',
			'Координация поставок',
		],
		price: 'от 20% от стоимости',
		duration: '14-21 день',
	},
	{
		id: 4,
		title: 'Перепланировка',
		description: 'Оптимизация пространства с учетом всех строительных норм',
		icon: '🏗️',
		features: [
			'Анализ существующих планов',
			'Согласование в БТИ',
			'Проектная документация',
			'Техническое заключение',
			'Сопровождение согласования',
		],
		price: 'от 50 000 ₽',
		duration: '60-90 дней',
	},
	{
		id: 5,
		title: '3D-визуализация',
		description: 'Фотореалистичные изображения будущего интерьера',
		icon: '🎬',
		features: [
			'Фотореалистичная визуализация',
			'Различные ракурсы',
			'Варианты освещения',
			'Детализация материалов',
			'Корректировки',
		],
		price: 'от 8 000 ₽/ракурс',
		duration: '7-10 дней',
	},
	{
		id: 6,
		title: 'Консультации',
		description: 'Экспертные советы по дизайну и организации пространства',
		icon: '💡',
		features: [
			'Анализ планировки',
			'Цветовые решения',
			'Подбор материалов',
			'Расстановка мебели',
			'Практические рекомендации',
		],
		price: 'от 3 000 ₽/час',
		duration: '1-2 часа',
	},
]

const process = [
	{
		step: '01',
		title: 'Знакомство',
		description: 'Встречаемся, обсуждаем ваши пожелания и бюджет проекта',
	},
	{
		step: '02',
		title: 'Замеры',
		description: 'Выезжаем на объект, делаем точные замеры помещения',
	},
	{
		step: '03',
		title: 'Планировка',
		description: 'Создаем оптимальные планировочные решения',
	},
	{
		step: '04',
		title: 'Дизайн',
		description: 'Разрабатываем концепцию и стилистику интерьера',
	},
	{
		step: '05',
		title: 'Визуализация',
		description: 'Создаем 3D-модель для полного понимания результата',
	},
	{
		step: '06',
		title: 'Реализация',
		description: 'Сопровождаем проект на всех этапах воплощения',
	},
]

export default function Services() {
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
						src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80'
						alt='Services background'
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
						Услуги
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Полный спектр услуг для создания идеального интерьера
					</motion.p>
				</div>
			</section>

			{/* Services Grid */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-yellow-900/20' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{services.map((service, index) => (
							<motion.div
								key={service.id}
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
								<p className='text-sm md:text-base text-white/70 leading-relaxed font-light mb-6'>
									{service.description}
								</p>

								<div className='space-y-3 mb-6'>
									{service.features.map((feature, featureIndex) => (
										<div
											key={featureIndex}
											className='flex items-center text-sm text-white/60'
										>
											<div className='w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 flex-shrink-0'></div>
											{feature}
										</div>
									))}
								</div>

								<div className='flex items-center justify-between pt-4 border-t border-white/10'>
									<div>
										<div className='text-sm text-white/60 mb-1'>Стоимость</div>
										<div className='text-sm font-medium text-white'>
											{service.price}
										</div>
									</div>
									<div className='text-right'>
										<div className='text-sm text-white/60 mb-1'>Срок</div>
										<div className='text-sm font-medium text-white'>
											{service.duration}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center mb-12 md:mb-20'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Как мы работаем
						</h2>
						<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
							Пошаговый процесс создания вашего идеального интерьера
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{process.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className='relative'
							>
								<div className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all'>
									<div className='flex items-center mb-4'>
										<div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4'>
											<span className='text-lg font-light text-white'>
												{item.step}
											</span>
										</div>
										<h3 className='text-lg md:text-xl font-light text-white'>
											{item.title}
										</h3>
									</div>
									<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
										{item.description}
									</p>
								</div>

								{/* Connection line */}
								{index < process.length - 1 && (
									<div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/20 transform -translate-y-1/2 z-10'></div>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-neutral-900' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='text-center mb-12 md:mb-20'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Частые вопросы
						</h2>
					</motion.div>

					<div className='max-w-4xl mx-auto space-y-6'>
						{[
							{
								question: 'Сколько времени занимает разработка дизайн-проекта?',
								answer:
									'Обычно полный дизайн-проект занимает от 30 до 45 дней в зависимости от площади и сложности объекта.',
							},
							{
								question: 'Включена ли 3D-визуализация в стоимость проекта?',
								answer:
									'Да, базовая 3D-визуализация (3-5 ракурсов) включена в стоимость полного дизайн-проекта.',
							},
							{
								question: 'Можно ли вносить изменения в проект?',
								answer:
									'Конечно! Мы предусматриваем 2 итерации правок бесплатно. Дополнительные изменения оплачиваются отдельно.',
							},
							{
								question: 'Работаете ли вы с ограниченным бюджетом?',
								answer:
									'Мы всегда стараемся найти оптимальные решения под любой бюджет, предлагая различные варианты материалов и решений.',
							},
						].map((faq, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10'
							>
								<h3 className='text-lg md:text-xl font-light mb-4 text-white'>
									{faq.question}
								</h3>
								<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
									{faq.answer}
								</p>
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
							Готовы начать?
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Обсудим ваш проект и подберем оптимальное решение
						</p>

						<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
							<motion.a
								href='/contact'
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className='bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center'
							>
								Получить консультацию
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
