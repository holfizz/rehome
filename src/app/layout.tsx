import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'REHOME - Дизайн интерьера Казань | Ремонт квартир под ключ Казань',
	description:
		'Дизайн интерьера в Казани от студии REHOME. Ремонт квартир под ключ, дизайн-проект, 3D визуализация. ✅ Доводим до совершенства ✅ Гарантия качества ✅ Индивидуальный подход',
	keywords:
		'дизайн интерьера казань, ремонт квартир казань, дизайн квартир казань, дизайнер интерьера казань, ремонт под ключ казань, дизайн-проект казань, 3д визуализация казань, студия дизайна казань, дизайн комнаты казань, дизайн кухни казань, дизайн спальни казань, дизайн детской казань, современный дизайн казань, элитный ремонт казань',
	authors: [{ name: 'Макаров Илья Дмитриевич' }],
	creator: 'REHOME Studio',
	publisher: 'REHOME Studio',
	robots: 'index, follow',
	viewport: 'width=device-width, initial-scale=1',
	metadataBase: new URL('https://rehomekz.vercel.app'),
	alternates: {
		canonical: 'https://rehomekz.vercel.app',
	},
	manifest: '/manifest.json',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
			{ url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
		],
		apple: [
			{ url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
		],
		other: [
			{
				rel: 'mask-icon',
				url: '/favicon.svg',
				color: '#938F91',
			},
		],
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: 'REHOME - Дизайн интерьера Казань',
	},
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: 'https://rehomekz.vercel.app',
		title: 'REHOME - Дизайн интерьера и ремонт квартир в Казани',
		description:
			'Студия дизайна интерьера REHOME в Казани. Создаем уникальные интерьеры квартир и домов. Ремонт под ключ с гарантией качества. Звоните: +7 (927) 439-43-55',
		siteName: 'REHOME Studio',
		images: [
			{
				url: '/assets/case1_ph2.webp',
				width: 1200,
				height: 630,
				alt: 'Дизайн интерьера квартиры в Казани - REHOME Studio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'REHOME - Дизайн интерьера Казань | Ремонт квартир под ключ',
		description:
			'Профессиональный дизайн интерьера и ремонт квартир в Казани. Индивидуальный подход, качественная реализация.',
		images: ['/assets/case1_ph2.webp'],
	},
	other: {
		'geo.region': 'RU-TA',
		'geo.placename': 'Казань',
		'geo.position': '55.8304;49.0661',
		ICBM: '55.8304, 49.0661',
		'msapplication-TileColor': '#938F91',
		'msapplication-TileImage': '/favicon-192x192.png',
		'msapplication-config': 'none',
		'theme-color': '#938F91',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				{/* PWA Meta Tags */}
				<meta name='application-name' content='REHOME Studio' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
				<meta name='apple-mobile-web-app-title' content='REHOME' />

				{/* Microsoft Tiles */}
				<meta name='msapplication-TileColor' content='#938F91' />
				<meta name='msapplication-TileImage' content='/favicon-192x192.png' />
				<meta
					name='msapplication-square70x70logo'
					content='/favicon-48x48.png'
				/>
				<meta
					name='msapplication-square150x150logo'
					content='/favicon-192x192.png'
				/>
				<meta
					name='msapplication-square310x310logo'
					content='/favicon-512x512.png'
				/>

				{/* Preload critical resources */}
				<link
					rel='preload'
					href='/assets/case1_ph2.webp'
					as='image'
					type='image/webp'
				/>
				<link rel='dns-prefetch' href='//fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>

				{/* Yandex.Metrika counter */}
				<script
					type='text/javascript'
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103474269', 'ym');

							ym(103474269, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
						`,
					}}
				/>
				<noscript>
					<div>
						<img
							src='https://mc.yandex.ru/watch/103474269'
							style={{ position: 'absolute', left: '-9999px' }}
							alt=''
						/>
					</div>
				</noscript>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
