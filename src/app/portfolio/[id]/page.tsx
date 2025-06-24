'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { getProjectById } from '../../../data/projects'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

export default function ProjectDetail() {
	const params = useParams()
	const projectId = parseInt(params.id as string)
	const project = getProjectById(projectId)

	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null
	)

	const openModal = (index: number) => {
		setSelectedImageIndex(index)
		document.body.style.overflow = 'hidden'
	}

	const closeModal = useCallback(() => {
		setSelectedImageIndex(null)
		document.body.style.overflow = 'unset'
	}, [])

	const nextImage = useCallback(() => {
		if (selectedImageIndex !== null && project) {
			setSelectedImageIndex((selectedImageIndex + 1) % project.images.length)
		}
	}, [selectedImageIndex, project])

	const prevImage = useCallback(() => {
		if (selectedImageIndex !== null && project) {
			setSelectedImageIndex(
				selectedImageIndex === 0
					? project.images.length - 1
					: selectedImageIndex - 1
			)
		}
	}, [selectedImageIndex, project])

	// Обработка клавиш
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (selectedImageIndex !== null) {
				switch (event.key) {
					case 'Escape':
						closeModal()
						break
					case 'ArrowLeft':
						prevImage()
						break
					case 'ArrowRight':
						nextImage()
						break
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [selectedImageIndex, closeModal, nextImage, prevImage])

	// Очистка при размонтировании компонента
	useEffect(() => {
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	if (!project) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl font-thin mb-4'>Проект не найден</h1>
					<Link
						href='/portfolio'
						className='text-white/70 hover:text-white transition-colors'
					>
						← Вернуться к портфолио
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src={project.image}
						alt={project.title}
						fill
						className='object-cover opacity-30'
					/>
					<div className='absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90' />
				</div>

				<div className='relative z-10 container mx-auto px-4 md:px-6'>
					<Link
						href='/portfolio'
						className='inline-flex items-center text-white/70 hover:text-white transition-colors mb-8 group'
					>
						<ArrowLeft className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform' />
						Назад к портфолио
					</Link>

					<motion.div
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='max-w-4xl'
					>
						<div className='flex flex-wrap items-center gap-4 mb-6'>
							<span className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full'>
								{project.year}
							</span>
							<span className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full'>
								{project.area}
							</span>
							<span className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full'>
								{project.style}
							</span>
						</div>

						<h1 className='text-4xl md:text-6xl lg:text-7xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'>
							{project.title}
						</h1>

						<p className='text-lg md:text-xl text-white/80 mb-6 leading-relaxed font-light'>
							{project.location}
						</p>

						<p className='text-base md:text-lg text-white/70 leading-relaxed font-light max-w-3xl'>
							{project.fullDescription}
						</p>
					</motion.div>
				</div>
			</section>

			{/* Project Details */}
			<section className='py-16 md:py-24'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid lg:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24'>
						{/* Project Info */}
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10'
						>
							<h3 className='text-xl md:text-2xl font-light mb-6 text-white'>
								Детали проекта
							</h3>
							<div className='space-y-4'>
								<div>
									<p className='text-sm text-white/60 mb-1'>Клиент</p>
									<p className='text-white/90'>{project.details.client}</p>
								</div>
								<div>
									<p className='text-sm text-white/60 mb-1'>Длительность</p>
									<p className='text-white/90'>{project.details.duration}</p>
								</div>
								<div>
									<p className='text-sm text-white/60 mb-1'>Бюджет</p>
									<p className='text-white/90'>{project.details.budget}</p>
								</div>
								<div>
									<p className='text-sm text-white/60 mb-2'>Команда</p>
									<div className='space-y-1'>
										{project.details.team.map((member, index) => (
											<p key={index} className='text-white/80 text-sm'>
												• {member}
											</p>
										))}
									</div>
								</div>
							</div>
						</motion.div>

						{/* Challenges */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10'
						>
							<h3 className='text-xl md:text-2xl font-light mb-6 text-white'>
								Вызовы
							</h3>
							<div className='space-y-3'>
								{project.challenges.map((challenge, index) => (
									<p
										key={index}
										className='text-white/80 text-sm leading-relaxed'
									>
										• {challenge}
									</p>
								))}
							</div>
						</motion.div>

						{/* Solutions */}
						<motion.div
							initial={{ opacity: 0, x: 40 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10'
						>
							<h3 className='text-xl md:text-2xl font-light mb-6 text-white'>
								Решения
							</h3>
							<div className='space-y-3'>
								{project.solutions.map((solution, index) => (
									<p
										key={index}
										className='text-white/80 text-sm leading-relaxed'
									>
										• {solution}
									</p>
								))}
							</div>
						</motion.div>
					</div>

					{/* Features */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='mb-16 md:mb-24'
					>
						<h3 className='text-2xl md:text-3xl font-light mb-8 text-white text-center'>
							Особенности проекта
						</h3>
						<div className='grid md:grid-cols-2 gap-4'>
							{project.features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									viewport={{ once: true }}
									className='bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all'
								>
									<p className='text-white/90 text-sm leading-relaxed'>
										• {feature}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Photo Gallery */}
			<section className='py-16 md:py-24'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.h3
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-2xl md:text-3xl font-light mb-12 text-white text-center'
					>
						Галерея проекта
					</motion.h3>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
						{project.images.map((image, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: index * 0.05 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.02 }}
								onClick={() => openModal(index)}
								className='relative overflow-hidden rounded-2xl cursor-pointer group bg-white/5 border border-white/10 hover:border-white/20 transition-all'
							>
								<Image
									src={image}
									alt={`${project.title} - фото ${index + 1}`}
									width={400}
									height={300}
									className='w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
									<div className='w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30'>
										<span className='text-white text-sm'>↗</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Image Modal */}
			<AnimatePresence>
				{selectedImageIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 z-[9999] bg-black flex items-center justify-center'
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 9999,
						}}
					>
						{/* Backdrop - клик для закрытия */}
						<div
							className='absolute inset-0 cursor-pointer'
							onClick={closeModal}
						/>

						{/* Navigation Controls */}
						<button
							onClick={closeModal}
							className='absolute top-6 right-6 z-10 w-14 h-14 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 hover:bg-black/90 hover:border-white/50 transition-all text-white'
						>
							<X className='w-7 h-7' />
						</button>

						<button
							onClick={prevImage}
							className='absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 hover:bg-black/90 hover:border-white/50 transition-all text-white'
						>
							<ChevronLeft className='w-7 h-7' />
						</button>

						<button
							onClick={nextImage}
							className='absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 hover:bg-black/90 hover:border-white/50 transition-all text-white'
						>
							<ChevronRight className='w-7 h-7' />
						</button>

						{/* Image Container */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='relative w-full h-full cursor-pointer flex items-center justify-center p-8'
							onClick={nextImage}
						>
							<Image
								src={project.images[selectedImageIndex]}
								alt={`${project.title} - фото ${selectedImageIndex + 1}`}
								width={1600}
								height={1200}
								className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
								priority
							/>

							{/* Image Counter */}
							<div className='absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/30'>
								<p className='text-white text-sm font-medium'>
									{selectedImageIndex + 1} / {project.images.length}
								</p>
							</div>

							{/* Hint для навигации */}
							<div className='absolute top-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl rounded-full px-6 py-2 border border-white/20 opacity-80'>
								<p className='text-white text-xs'>
									Клик для следующего фото • ← → для навигации • ESC для
									закрытия
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

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
