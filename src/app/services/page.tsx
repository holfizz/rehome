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

const services = [
	{
		id: 1,
		title: 'Замер',
		description: 'Точные замеры помещения — первый шаг к идеальному результату',
		icon: '📏',
		features: [
			'Выезд на объект в удобное время',
			'Высокоточные лазерные измерения',
			'Детальная фотофиксация',
			'Анализ особенностей помещения',
			'Консультация по возможностям пространства',
		],
		price: 'Бесплатно при заказе дизайн-проекта',
		duration: '1-2 часа',
		image: '/assets/case1_ph1.webp',
		emphasis: 'Точность до миллиметра — основа идеального проекта',
	},
	{
		id: 2,
		title: 'Дизайн-проект',
		description:
			'Создаем детальный дизайн-проект с 3D-визуализацией всех помещений. Включает планировочные решения, подбор материалов, освещение и всю техническую документацию для ремонта.',
		icon: '🎨',
		image: '/assets/case1_ph7.webp',
		features: [
			'Планировочные решения до полного одобрения',
			'3D-визуализация всех помещений',
			'Детальные чертежи и схемы',
			'Подбор материалов и отделки',
			'Авторский надзор',
			'Неограниченные правки до утверждения',
		],
		emphasis:
			'Проект доводим до совершенства — работаем до полного утверждения всех деталей.',
		price: '4 000 ₽/м²',
		duration: '3-4 недели',
		hasTariffs: false,
	},
	{
		id: 3,
		title: 'Ремонт',
		description: 'Воплощение дизайн-проекта с контролем каждого этапа работ',
		icon: '🛠️',
		features: [
			'Профессиональная строительная бригада',
			'Авторский надзор на всех этапах',
			'Контроль качества материалов и работ',
			'Соблюдение сроков и бюджета',
			'Сдача объекта только при вашем 100% удовлетворении',
		],
		price: 'от 8 000 ₽/м²',
		duration: '2-6 месяцев',
		image: '/assets/case1_ph4.webp',
		emphasis:
			'Не считаем проект завершенным, пока результат не будет идеальным',
	},
	{
		id: 4,
		title: 'Авторский надзор',
		description: 'Профессиональный контроль за реализацией проекта',
		icon: '👁️',
		features: [
			'Еженедельные выезды на объект',
			'Контроль соответствия проекту',
			'Решение спорных вопросов с подрядчиками',
			'Корректировка проекта при необходимости',
			'Консультации по материалам и технологиям',
		],
		price: '50 000 ₽/месяц',
		duration: 'На весь период ремонта',
		image: '/assets/case1_ph3.webp',
		emphasis:
			'Гарантируем, что каждая деталь будет реализована в точности как задумано',
	},
]

// Тарифы дизайн-проекта
const tariffs = [
	{
		name: 'Полный дизайн-проект',
		price: '4 000 ₽/м²',
		color: 'from-amber-500 to-orange-600',
		textColor: 'text-white',
		recommended: true,
		features: [
			'Выезд дизайнера и замеры',
			'Планировочные решения',
			'3D-визуализация всех помещений',
			'Подбор отделочных материалов',
			'Развертки стен с размерами',
			'Схемы размещения розеток и выключателей',
			'Схемы освещения',
			'Ведомость отделочных материалов',
			'Неограниченные правки до утверждения',
			'Помощь в выборе мебели',
			'Консультации на всех этапах ремонта',
		],
	},
]

export default function Services() {
	return (
		<div
			className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-x-hidden relative'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
			}}
		>
			{/* Background decorative elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{/* Subtle gradient orbs */}
				<div className='absolute top-0 right-0 w-96 h-96 opacity-10'>
					<div className='w-full h-full bg-gradient-radial from-amber-500/15 via-orange-500/8 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute top-1/4 left-0 w-80 h-80 opacity-8'>
					<div className='w-full h-full bg-gradient-radial from-blue-500/12 via-cyan-500/6 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute bottom-0 right-1/3 w-72 h-72 opacity-8'>
					<div className='w-full h-full bg-gradient-radial from-purple-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute bottom-1/3 left-1/4 w-64 h-64 opacity-6'>
					<div className='w-full h-full bg-gradient-radial from-emerald-500/8 via-teal-500/4 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-4'>
					<div className='w-full h-full bg-gradient-radial from-indigo-500/12 via-blue-500/6 to-transparent rounded-full blur-3xl'></div>
				</div>

				{/* Mesh pattern overlay */}
				<div
					className='absolute inset-0 opacity-[0.015]'
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
						backgroundSize: '64px 64px',
					}}
				></div>

				{/* Subtle geometric shapes */}
				<div className='absolute top-32 right-32 w-24 h-24 opacity-4'>
					<div className='w-full h-full bg-gradient-to-br from-white/8 to-white/3 rounded-full blur-xl'></div>
				</div>
				<div className='absolute bottom-40 left-32 w-20 h-20 opacity-4'>
					<div className='w-full h-full bg-gradient-to-tl from-white/6 to-white/2 rounded-lg rotate-12 blur-xl'></div>
				</div>
			</div>

			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/assets/case1_ph2.webp'
						alt='Services background'
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
						Наши услуги
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/80 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed font-light'
					>
						Комплексный подход к созданию идеального интерьера
					</motion.p>
					<motion.h2
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.4 }}
						className='text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-light'
					>
						Не завершаем проект, пока всё не будет на 100% как вы мечтали
					</motion.h2>
				</div>
			</section>

			{/* Services Grid */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-yellow-900/20' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<div className='grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10'>
						{services.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								whileHover={{ y: -8, scale: 1.02 }}
								className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group cursor-pointer'
							>
								{/* Image Header */}
								<div className='relative h-48 md:h-56 lg:h-64 overflow-hidden'>
									<Image
										src={service.image}
										alt={service.title}
										fill
										className='object-cover transition-transform duration-700 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10' />

									{/* Service Icon */}
									<div className='absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20'>
										<span className='text-xl md:text-2xl'>{service.icon}</span>
									</div>

									{/* Service Title */}
									<div className='absolute bottom-0 left-0 right-0 p-4 md:p-6'>
										<h3 className='text-xl md:text-2xl lg:text-3xl font-light text-white'>
											{service.title}
										</h3>
									</div>
								</div>

								{/* Content */}
								<div className='p-5 md:p-7'>
									<p className='text-sm md:text-base text-white/80 leading-relaxed font-light mb-6'>
										{service.description}
									</p>

									<div className='space-y-3 mb-6'>
										{service.features.map((feature, featureIndex) => (
											<div
												key={featureIndex}
												className='flex items-center text-sm text-white/70'
											>
												<div className='w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 flex-shrink-0'></div>
												{feature}
											</div>
										))}
									</div>

									{/* Emphasis Box */}
									<div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10'>
										<p className='text-sm md:text-base text-white/90 italic'>
											&ldquo;{service.emphasis}&rdquo;
										</p>
									</div>

									<div className='flex items-center justify-between pt-4 border-t border-white/10'>
										<div>
											<div className='text-sm text-white/60 mb-1'>
												Стоимость
											</div>
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
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Tariffs Section */}
			<section id='tariffs' className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80' />

				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-12 md:mb-16'
				>
					<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
						Стоимость дизайн-проекта
					</h2>
					<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
						Один тариф — всё включено. Никаких скрытых платежей и доплат.
					</p>
				</motion.div>

				<div className='max-w-2xl mx-auto'>
					{tariffs.map((tariff, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-amber-400/30 relative'
						>
							<div className='absolute top-0 left-0 right-0 bg-amber-500/20 text-white text-sm font-medium py-2 text-center'>
								✨ Всё включено
							</div>

							<div className='p-8 md:p-12 pt-12 md:pt-16'>
								<div
									className={`w-20 h-20 bg-gradient-to-br ${tariff.color} rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg`}
								>
									<span className={`text-3xl font-light ${tariff.textColor}`}>
										💎
									</span>
								</div>

								<h3 className='text-2xl md:text-3xl font-light mb-4 text-white text-center'>
									{tariff.name}
								</h3>
								<p className='text-4xl md:text-5xl font-light text-amber-300 mb-8 text-center'>
									{tariff.price}
								</p>

								<div className='space-y-4 mb-10'>
									{tariff.features.map((feature, featureIndex) => (
										<div
											key={featureIndex}
											className='flex items-center text-base text-white/80'
										>
											<div className='w-2 h-2 bg-amber-400 rounded-full mr-4 flex-shrink-0'></div>
											{feature}
										</div>
									))}
								</div>

								<div className='text-center'>
									<motion.a
										href='/contact'
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{ type: 'spring', stiffness: 400, damping: 25 }}
										className='inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-4 rounded-full font-medium text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-[0_8px_32px_rgba(245,158,11,0.3)] w-full sm:w-auto'
									>
										Заказать проект
									</motion.a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Process Section */}
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
							Наш подход к работе
						</h2>
						<p className='text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light'>
							Мы не считаем проект завершенным, пока вы не будете на 100%
							довольны результатом
						</p>
					</motion.div>

					<div className='max-w-4xl mx-auto'>
						<div className='relative'>
							{/* Vertical line */}
							<div className='absolute left-6 md:left-9 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-amber-400/50 to-amber-300/30'></div>

							{[
								{
									number: '01',
									title: 'Знакомство и замер',
									description:
										'Выезжаем на объект, внимательно слушаем ваши пожелания, делаем точные замеры и анализируем особенности помещения.',
								},
								{
									number: '02',
									title: 'Концепция и планировка',
									description:
										'Разрабатываем варианты планировок и концептуальные решения. Вносим корректировки до тех пор, пока вы не будете полностью довольны.',
								},
								{
									number: '03',
									title: 'Дизайн-проект',
									description:
										'Создаем детальный проект с 3D-визуализацией. Прорабатываем каждую деталь интерьера до вашего полного одобрения.',
								},
								{
									number: '04',
									title: 'Реализация',
									description:
										'Воплощаем проект в жизнь с авторским надзором. Контролируем каждый этап работ и качество материалов.',
								},
								{
									number: '05',
									title: 'Финальная проверка',
									description:
										'Проводим тщательную проверку всех элементов интерьера. Проект считается завершенным только при вашем 100% удовлетворении.',
								},
							].map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									className='relative pl-16 md:pl-24 pb-12 md:pb-16'
								>
									{/* Circle marker */}
									<div className='absolute left-0 top-0 w-12 h-12 md:w-18 md:h-18 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full flex items-center justify-center border border-amber-400/30'>
										<span className='text-lg md:text-xl font-light text-amber-300'>
											{step.number}
										</span>
									</div>

									<h3 className='text-xl md:text-2xl font-light mb-3 md:mb-4 text-white'>
										{step.title}
									</h3>
									<p className='text-sm md:text-base text-white/70 leading-relaxed font-light'>
										{step.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-800 via-neutral-800 to-stone-800' />

				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className='text-center max-w-4xl mx-auto'
					>
						<h2 className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							Готовы начать путь к идеальному интерьеру?
						</h2>
						<p className='text-base md:text-lg text-white/80 mb-8 md:mb-12 leading-relaxed font-light'>
							Мы не остановимся, пока результат не будет на 100% соответствовать
							вашим мечтам
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
			<Footer />
		</div>
	)
}
