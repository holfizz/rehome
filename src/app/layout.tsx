import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'REHOME — Дизайн квартир под ключ | Студия дизайна интерьеров',
	description:
		'Современная студия дизайна интерьеров. Создаем стильные и функциональные квартиры под ключ в Москве и СПб. От 3000₽/м². Бесплатная консультация.',
	keywords:
		'дизайн интерьера, дизайн квартир, ремонт под ключ, студия дизайна, REHOME, от 3000₽/м²',
	authors: [{ name: 'REHOME Studio' }],
	creator: 'REHOME Studio',
	publisher: 'REHOME Studio',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: 'REHOME — Дизайн квартир под ключ',
		description:
			'Создаем пространства, которые вдохновляют жить. Профессиональный дизайн интерьера от 3000₽/м².',
		url: 'https://rehome.studio',
		siteName: 'REHOME Studio',
		images: [
			{
				url: '/og-image.webp',
				width: 1200,
				height: 630,
				alt: 'REHOME — Дизайн квартир под ключ',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'REHOME — Дизайн квартир под ключ',
		description:
			'Создаем пространства, которые вдохновляют жить. Профессиональный дизайн интерьера от 3000₽/м².',
		images: ['/og-image.webp'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	other: {
		'yandex-verification': '7488b544cfa745a1',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className={outfit.className}>{children}</body>
		</html>
	)
}
