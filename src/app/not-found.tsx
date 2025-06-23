'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../components/Header'

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
		<div
			className='h-screen w-full relative overflow-hidden fixed inset-0'
			style={{
				WebkitOverflowScrolling: 'touch',
			}}
		>
			{/* Simple Dark Orange Gradient Background */}
			<div className='absolute inset-0 bg-gradient-to-br from-black via-orange-950 to-black' />
			<div className='absolute inset-0 bg-gradient-to-tr from-transparent via-orange-900/20 to-transparent' />
			<div className='absolute inset-0 bg-gradient-to-bl from-transparent via-amber-900/10 to-transparent' />

			<div className='absolute top-0 left-0 right-0 z-20'>
				<Header />
			</div>

			{/* Floating Glass Orbs */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							opacity: 0,
							x: Math.random() * 100 + '%',
							y: Math.random() * 100 + '%',
							scale: 0,
						}}
						animate={{
							opacity: [0.1, 0.3, 0.1],
							scale: [0.5, 1, 0.5],
							x: Math.random() * 100 + '%',
							y: Math.random() * 100 + '%',
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
			<div className='relative z-10 h-full flex items-center justify-center px-4 md:px-6'>
				<div className='text-center max-w-4xl mx-auto'>
					{/* Giant Glass 404 */}
					<motion.div
						initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
						animate={{ opacity: 1, scale: 1, rotateY: 0 }}
						transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
						variants={floatingAnimation}
						className='relative mb-8'
					>
						<div className='text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-bold leading-none select-none'>
							<span
								className='inline-block bg-white/5 backdrop-blur-3xl text-transparent bg-clip-text 
								border-4 border-white/20 rounded-[2rem] md:rounded-[3rem] px-4 md:px-8 lg:px-12 py-2 md:py-4 lg:py-6
								shadow-[0_8px_32px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]
								relative overflow-hidden'
							>
								<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[2rem] md:rounded-[3rem]' />
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
								className='bg-white/20 backdrop-blur-xl text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-lg md:text-xl font-light 
									border border-white/30 hover:bg-white/25 hover:border-white/40 transition-all 
									shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] relative overflow-hidden group inline-block'
							>
								<span className='relative z-10'>🏠 Домой</span>
								<div
									className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
									opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl md:rounded-3xl'
								/>
							</Link>
						</motion.div>
					</motion.div>

					{/* Fun Facts */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='mt-8 md:mt-12 text-center px-4'
					>
						<div
							className='bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 
							px-4 md:px-6 py-3 md:py-4 inline-block shadow-[0_8px_32px_rgba(255,255,255,0.05)]'
						>
							<p className='text-white/70 text-xs md:text-sm font-light'>
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
							x: Math.random() * 100 + '%',
							y: '110%',
						}}
						animate={{
							opacity: [0, 0.6, 0],
							y: '-10%',
							x: Math.random() * 100 + '%',
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
		</div>
	)
}
