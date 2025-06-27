import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN =
	process.env.TELEGRAM_BOT_TOKEN ||
	'7825175484:AAFpxFbSkkAO67Kfb9YlOBM4x3dTXk-Bp8U'

interface TelegramUpdate {
	message?: {
		chat: {
			id: number
			type: string
			title?: string
			first_name?: string
		}
	}
	channel_post?: {
		chat: {
			id: number
			type: string
			title?: string
		}
	}
}

interface ChatInfo {
	id: number
	type: string
	title: string
}

export async function GET() {
	try {
		// Получаем последние обновления
		const response = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
		)

		const data = await response.json()

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Ошибка получения обновлений', details: data },
				{ status: 500 }
			)
		}

		// Извлекаем уникальные chat_id из всех сообщений
		const chatIds = new Set<string>()
		const chats: ChatInfo[] = []

		data.result.forEach((update: TelegramUpdate) => {
			if (update.message?.chat?.id) {
				const chatKey = `${update.message.chat.id}`
				if (!chatIds.has(chatKey)) {
					chatIds.add(chatKey)
					chats.push({
						id: update.message.chat.id,
						type: update.message.chat.type,
						title:
							update.message.chat.title ||
							update.message.chat.first_name ||
							'Unknown',
					})
				}
			}
			if (update.channel_post?.chat?.id) {
				const chatKey = `${update.channel_post.chat.id}`
				if (!chatIds.has(chatKey)) {
					chatIds.add(chatKey)
					chats.push({
						id: update.channel_post.chat.id,
						type: update.channel_post.chat.type,
						title: update.channel_post.chat.title || 'Unknown Channel',
					})
				}
			}
		})

		return NextResponse.json({
			success: true,
			totalUpdates: data.result.length,
			chats: chats,
			instructions: {
				step1: 'Отправьте любое сообщение в группу с ботом',
				step2: 'Обновите эту страницу',
				step3: 'Скопируйте ID группы из списка ниже',
				step4: 'Обновите .env.local с правильным TELEGRAM_CHAT_ID',
			},
		})
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
