'use client'

import { motion } from 'framer-motion'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

const fadeInUp = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: 'easeOut' },
}

export default function Privacy() {
	return (
		<div
			className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-x-hidden relative'
			style={{
				WebkitOverflowScrolling: 'touch',
				overflowY: 'auto',
			}}
		>
			{/* Background decorative elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{/* Subtle gradient orbs */}
				<div className='absolute top-0 left-0 w-96 h-96 opacity-6'>
					<div className='w-full h-full bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl'></div>
				</div>
				<div className='absolute bottom-0 right-0 w-80 h-80 opacity-5'>
					<div className='w-full h-full bg-gradient-radial from-emerald-500/8 via-teal-500/4 to-transparent rounded-full blur-3xl'></div>
				</div>

				{/* Mesh pattern overlay */}
				<div
					className='absolute inset-0 opacity-[0.015]'
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
						backgroundSize: '48px 48px',
					}}
				></div>
			</div>

			<Header />

			{/* Hero Section */}
			<section className='relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden'>
				<div className='relative z-10 container mx-auto px-4 md:px-6 text-center max-w-4xl'>
					<motion.h1
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						className='text-3xl md:text-5xl lg:text-6xl font-thin mb-6 md:mb-8 text-white tracking-[-0.02em]'
					>
						Политика конфиденциальности
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						initial='initial'
						animate='animate'
						transition={{ delay: 0.2 }}
						className='text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed font-light'
					>
						Политика в отношении обработки персональных данных
					</motion.p>
				</div>
			</section>

			{/* Content Section */}
			<section className='py-8 md:py-16 relative'>
				<div className='container mx-auto px-4 md:px-6 max-w-4xl'>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/10'
					>
						<div className='prose prose-invert prose-lg max-w-none'>
							{/* Section 1 */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									1. Общие положения
								</h2>
								<p className='text-white/80 leading-relaxed mb-4'>
									Настоящая политика обработки персональных данных составлена в
									соответствии с требованиями Федерального закона от 27.07.2006.
									№ 152-ФЗ «О персональных данных» (далее — Закон о персональных
									данных) и определяет порядок обработки персональных данных и
									меры по обеспечению безопасности персональных данных,
									предпринимаемые{' '}
									<strong className='text-white'>
										Макаров Илья Дмитриевич
									</strong>{' '}
									(далее — Оператор).
								</p>
								<p className='text-white/80 leading-relaxed mb-4'>
									<strong>1.1.</strong> Оператор ставит своей важнейшей целью и
									условием осуществления своей деятельности соблюдение прав и
									свобод человека и гражданина при обработке его персональных
									данных, в том числе защиты прав на неприкосновенность частной
									жизни, личную и семейную тайну.
								</p>
								<p className='text-white/80 leading-relaxed'>
									<strong>1.2.</strong> Настоящая политика Оператора в отношении
									обработки персональных данных (далее — Политика) применяется
									ко всей информации, которую Оператор может получить о
									посетителях веб-сайта{' '}
									<a
										href='https://rehomekz.vercel.app/'
										className='text-blue-400 hover:text-blue-300'
									>
										https://rehomekz.vercel.app/
									</a>
									.
								</p>
							</div>

							{/* Section 2 */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									2. Основные понятия, используемые в Политике
								</h2>
								<div className='space-y-4'>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.1.</strong> Автоматизированная обработка
										персональных данных — обработка персональных данных с
										помощью средств вычислительной техники.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.2.</strong> Блокирование персональных данных —
										временное прекращение обработки персональных данных (за
										исключением случаев, если обработка необходима для уточнения
										персональных данных).
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.3.</strong> Веб-сайт — совокупность графических и
										информационных материалов, а также программ для ЭВМ и баз
										данных, обеспечивающих их доступность в сети интернет по
										сетевому адресу{' '}
										<a
											href='https://rehomekz.vercel.app/'
											className='text-blue-400 hover:text-blue-300'
										>
											https://rehomekz.vercel.app/
										</a>
										.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.4.</strong> Информационная система персональных
										данных — совокупность содержащихся в базах данных
										персональных данных и обеспечивающих их обработку
										информационных технологий и технических средств.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.5.</strong> Обезличивание персональных данных —
										действия, в результате которых невозможно определить без
										использования дополнительной информации принадлежность
										персональных данных конкретному Пользователю или иному
										субъекту персональных данных.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>2.10.</strong> Пользователь — любой посетитель
										веб-сайта{' '}
										<a
											href='https://rehomekz.vercel.app/'
											className='text-blue-400 hover:text-blue-300'
										>
											https://rehomekz.vercel.app/
										</a>
										.
									</p>
								</div>
							</div>

							{/* Section 3 */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									3. Основные права и обязанности Оператора
								</h2>
								<div className='mb-6'>
									<h3 className='text-xl font-medium mb-4 text-white/90'>
										3.1. Оператор имеет право:
									</h3>
									<ul className='space-y-2 text-white/80 list-disc list-inside'>
										<li>
											получать от субъекта персональных данных достоверные
											информацию и/или документы, содержащие персональные
											данные;
										</li>
										<li>
											в случае отзыва субъектом персональных данных согласия на
											обработку персональных данных, продолжить обработку
											персональных данных при наличии законных оснований;
										</li>
										<li>
											самостоятельно определять состав и перечень мер,
											необходимых для обеспечения выполнения обязанностей,
											предусмотренных Законом о персональных данных.
										</li>
									</ul>
								</div>
								<div>
									<h3 className='text-xl font-medium mb-4 text-white/90'>
										3.2. Оператор обязан:
									</h3>
									<ul className='space-y-2 text-white/80 list-disc list-inside'>
										<li>
											предоставлять субъекту персональных данных по его просьбе
											информацию, касающуюся обработки его персональных данных;
										</li>
										<li>
											организовывать обработку персональных данных в порядке,
											установленном действующим законодательством РФ;
										</li>
										<li>
											принимать правовые, организационные и технические меры для
											защиты персональных данных;
										</li>
										<li>
											публиковать или иным образом обеспечивать неограниченный
											доступ к настоящей Политике.
										</li>
									</ul>
								</div>
							</div>

							{/* Section 6 - Goals table */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									6. Цели обработки персональных данных
								</h2>
								<div className='bg-white/5 border border-white/10 rounded-xl overflow-hidden'>
									<div className='grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10'>
										<div className='p-4'>
											<h4 className='font-semibold text-white mb-2'>
												Цель обработки
											</h4>
											<p className='text-white/80 text-sm'>
												Информирование Пользователя посредством отправки
												электронных писем
											</p>
										</div>
										<div className='p-4'>
											<h4 className='font-semibold text-white mb-2'>
												Персональные данные
											</h4>
											<ul className='text-white/80 text-sm space-y-1'>
												<li>• номера телефонов</li>
												<li>• телеграм username</li>
											</ul>
										</div>
									</div>
									<div className='p-4 border-t border-white/10'>
										<h4 className='font-semibold text-white mb-2'>
											Виды обработки персональных данных
										</h4>
										<p className='text-white/80 text-sm'>
											Сбор, запись, систематизация, накопление, хранение,
											уничтожение и обезличивание персональных данных
										</p>
									</div>
								</div>
							</div>

							{/* Section 8 */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									8. Порядок сбора, хранения, передачи персональных данных
								</h2>
								<div className='space-y-4'>
									<p className='text-white/80 leading-relaxed'>
										Безопасность персональных данных, которые обрабатываются
										Оператором, обеспечивается путем реализации правовых,
										организационных и технических мер, необходимых для
										выполнения в полном объеме требований действующего
										законодательства в области защиты персональных данных.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>8.2.</strong> Персональные данные Пользователя
										никогда, ни при каких условиях не будут переданы третьим
										лицам, за исключением случаев, связанных с исполнением
										действующего законодательства.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>8.3.</strong> В случае выявления неточностей в
										персональных данных, Пользователь может актуализировать их
										самостоятельно, путем направления Оператору уведомление на
										адрес электронной почты{' '}
										<a
											href='mailto:b.design.first.business@gmail.com'
											className='text-blue-400 hover:text-blue-300'
										>
											b.design.first.business@gmail.com
										</a>{' '}
										с пометкой «Актуализация персональных данных».
									</p>
									<div className='bg-amber-500/10 border border-amber-400/20 rounded-xl p-4'>
										<p className='text-amber-200 text-sm'>
											<strong>Важно:</strong> Пользователь может в любой момент
											отозвать свое согласие на обработку персональных данных,
											направив Оператору уведомление на электронный адрес{' '}
											<a
												href='mailto:b.design.first.business@gmail.com'
												className='text-amber-300 hover:text-amber-200'
											>
												b.design.first.business@gmail.com
											</a>{' '}
											с пометкой «Отзыв согласия на обработку персональных
											данных».
										</p>
									</div>
								</div>
							</div>

							{/* Section 12 */}
							<div className='mb-8'>
								<h2 className='text-2xl md:text-3xl font-light mb-6 text-white border-b border-white/20 pb-3'>
									12. Заключительные положения
								</h2>
								<div className='space-y-4'>
									<p className='text-white/80 leading-relaxed'>
										<strong>12.1.</strong> Пользователь может получить любые
										разъяснения по интересующим вопросам, касающимся обработки
										его персональных данных, обратившись к Оператору с помощью
										электронной почты{' '}
										<a
											href='mailto:b.design.first.business@gmail.com'
											className='text-blue-400 hover:text-blue-300'
										>
											b.design.first.business@gmail.com
										</a>
										.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>12.2.</strong> В данном документе будут отражены
										любые изменения политики обработки персональных данных
										Оператором. Политика действует бессрочно до замены ее новой
										версией.
									</p>
									<p className='text-white/80 leading-relaxed'>
										<strong>12.3.</strong> Актуальная версия Политики в
										свободном доступе расположена в сети Интернет по адресу{' '}
										<a
											href='https://rehomekz.vercel.app/privacy'
											className='text-blue-400 hover:text-blue-300'
										>
											https://rehomekz.vercel.app/privacy
										</a>
										.
									</p>
								</div>
							</div>

							{/* Contact info box */}
							<div className='bg-blue-500/10 border border-blue-400/20 rounded-xl p-6 text-center'>
								<h3 className='text-xl font-medium mb-4 text-white'>
									Контактная информация
								</h3>
								<p className='text-blue-200 mb-2'>
									<strong>Оператор:</strong> Макаров Илья Дмитриевич
								</p>
								<p className='text-blue-200 mb-2'>
									<strong>Email:</strong>{' '}
									<a
										href='mailto:b.design.first.business@gmail.com'
										className='text-blue-300 hover:text-blue-200'
									>
										b.design.first.business@gmail.com
									</a>
								</p>
								<p className='text-blue-200 text-sm'>
									Дата последнего обновления: Январь 2025
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
