'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

const floatingAnimation = {
	animate: {
		y: [-10, 10, -10],
		transition: {
			duration: 4,
			repeat: Infinity,
			ease: 'easeInOut' as const,
		},
	},
}

export default function NotFound() {
	return (
		<div className='min-h-screen relative overflow-hidden'>
			{/* Simple Dark Orange Gradient Background */}
			<div className='absolute inset-0 bg-gradient-to-br from-black via-orange-950 to-black' />
			<div className='absolute inset-0 bg-gradient-to-tr from-transparent via-orange-900/20 to-transparent' />
			<div className='absolute inset-0 bg-gradient-to-bl from-transparent via-amber-900/10 to-transparent' />

			{/* Floating Glass Orbs */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							opacity: 0,
							x:
								typeof window !== 'undefined'
									? Math.random() * window.innerWidth
									: Math.random() * 1200,
							y:
								typeof window !== 'undefined'
									? Math.random() * window.innerHeight
									: Math.random() * 800,
							scale: 0,
						}}
						animate={{
							opacity: [0.1, 0.3, 0.1],
							scale: [0.5, 1, 0.5],
							x:
								typeof window !== 'undefined'
									? Math.random() * window.innerWidth
									: Math.random() * 1200,
							y:
								typeof window !== 'undefined'
									? Math.random() * window.innerHeight
									: Math.random() * 800,
						}}
						transition={{
							duration: 8 + Math.random() * 4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: Math.random() * 2,
						}}
						className='absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 
							bg-white/10 backdrop-blur-xl rounded-full border border-white/20'
					/>
				))}
			</div>

			{/* Main Content */}
			<div className='relative z-10 min-h-screen flex items-center justify-center px-6 pt-20'>
				<div className='text-center max-w-4xl mx-auto'>
					{/* Giant Glass 404 */}
					<motion.div
						initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
						animate={{ opacity: 1, scale: 1, rotateY: 0 }}
						transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
						variants={floatingAnimation}
						className='relative mb-8'
					>
						<div className='text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold leading-none select-none'>
							<span
								className='inline-block bg-white/5 backdrop-blur-3xl text-transparent bg-clip-text 
								border-4 border-white/20 rounded-[3rem] px-6 md:px-12 py-3 md:py-6
								shadow-[0_8px_32px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]
								relative overflow-hidden'
							>
								<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[3rem]' />
								<span
									className='relative z-10 bg-gradient-to-br from-white/90 via-white/70 to-white/50 bg-clip-text text-transparent
									drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]'
								>
									404
								</span>
							</span>
						</div>
					</motion.div>

					{/* Single Home Button */}
					<motion.div
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.4 }}
						className='flex justify-center'
					>
						<motion.div
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: 'spring', stiffness: 400, damping: 25 }}
						>
							<Link
								href='/'
								className='bg-white/20 backdrop-blur-xl text-white px-12 py-6 rounded-3xl text-xl font-light 
									border border-white/30 hover:bg-white/25 hover:border-white/40 transition-all 
									shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] relative overflow-hidden group inline-block'
							>
								<span className='relative z-10'>🏠 Домой</span>
								<div
									className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
									opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl'
								/>
							</Link>
						</motion.div>
					</motion.div>

					{/* Fun Facts */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='mt-12 text-center'
					>
						<div
							className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 
							px-6 py-4 inline-block shadow-[0_8px_32px_rgba(255,255,255,0.05)]'
						>
							<p className='text-white/70 text-sm font-light'>
								💡 Забавный факт: HTTP код 404 назван в честь комнаты 404 в
								CERN, где хранился первый веб-сервер
							</p>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Animated Background Particles */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(30)].map((_, i) => (
					<motion.div
						key={`particle-${i}`}
						initial={{
							opacity: 0,
							x:
								Math.random() *
								(typeof window !== 'undefined' ? window.innerWidth : 1200),
							y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
						}}
						animate={{
							opacity: [0, 0.6, 0],
							y: -100,
							x:
								Math.random() *
								(typeof window !== 'undefined' ? window.innerWidth : 1200),
						}}
						transition={{
							duration: 8 + Math.random() * 4,
							repeat: Infinity,
							ease: 'linear',
							delay: Math.random() * 8,
						}}
						className='absolute w-1 h-1 bg-white/40 rounded-full'
					/>
				))}
			</div>

			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
				className='fixed top-4 left-4 right-4 z-50 bg-white/10 backdrop-blur-3xl border border-white/20 
					rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
			>
				<div className='flex items-center justify-between px-8 md:px-12 py-4 md:py-5'>
					<motion.div
						whileHover={{ scale: 1.02 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
					>
						<Link href='/' className='flex items-center space-x-4'>
							<div
								className='w-10 h-10 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center 
								border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]'
							>
								<span className='text-white font-light text-lg'>R</span>
							</div>
							<span className='text-2xl md:text-3xl font-extralight tracking-[0.02em] text-white/95'>
								REHOME
							</span>
						</Link>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -1 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
					>
						<a
							href='https://t.me/holfizz'
							target='_blank'
							rel='noopener noreferrer'
							className='bg-white/15 backdrop-blur-xl text-white px-6 py-2.5 rounded-full text-sm font-light 
								border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all 
								shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
						>
							Обсудить
						</a>
					</motion.div>
				</div>
			</motion.header>
		</div>
	)
}
