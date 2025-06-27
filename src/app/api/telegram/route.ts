import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN =
	process.env.TELEGRAM_BOT_TOKEN ||
	'7825175484:AAFpxFbSkkAO67Kfb9YlOBM4x3dTXk-Bp8U'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1002762486376'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { method, contact } = body

		console.log('Received request:', { method, contact })
		console.log(
			'Using bot token:',
			TELEGRAM_BOT_TOKEN ? 'Token exists' : 'No token'
		)
		console.log('Using chat ID:', TELEGRAM_CHAT_ID)

		if (!method || !contact) {
			return NextResponse.json(
				{ error: 'Метод связи и контактная информация обязательны' },
				{ status: 400 }
			)
		}

		// Определяем иконку и название метода связи
		const getMethodInfo = (method: string) => {
			switch (method) {
				case 'whatsapp':
					return { icon: '📱', name: 'WhatsApp', emoji: '🟢' }
				case 'telegram':
					return { icon: '✈️', name: 'Telegram', emoji: '🔵' }
				case 'phone':
					return { icon: '📞', name: 'Телефон', emoji: '🟠' }
				default:
					return { icon: '📞', name: 'Неизвестно', emoji: '⚪' }
			}
		}

		const methodInfo = getMethodInfo(method)
		const timestamp = new Date().toLocaleString('ru-RU', {
			timeZone: 'Europe/Moscow',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		})

		// Форматируем контактную информацию
		const formatContact = (contact: string, method: string) => {
			if (method === 'phone' || method === 'whatsapp') {
				// Убираем все символы кроме цифр и +
				const cleaned = contact.replace(/[^\d+]/g, '')
				if (cleaned.startsWith('8')) {
					return '+7' + cleaned.substring(1)
				}
				return cleaned.startsWith('+') ? cleaned : '+' + cleaned
			}
			return contact
		}

		const formattedContact = formatContact(contact, method)

		// Формируем простое сообщение для Telegram
		const message = `🏠 НОВАЯ ЗАЯВКА С САЙТА REHOME

${methodInfo.emoji} Способ связи: ${methodInfo.icon} ${methodInfo.name}
📝 Контакт: ${formattedContact}

🕐 Время заявки: ${timestamp}
🌐 Источник: Сайт REHOME
`

		console.log('Sending message:', message)
		console.log('To chat ID:', TELEGRAM_CHAT_ID)

		// Сначала проверим, что бот работает - получим информацию о боте
		const botInfoResponse = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
		)

		if (!botInfoResponse.ok) {
			console.error('Bot token is invalid')
			return NextResponse.json(
				{ error: 'Неверный токен бота' },
				{ status: 500 }
			)
		}

		const botInfo = await botInfoResponse.json()
		console.log('Bot info:', botInfo)

		// Отправляем сообщение в Telegram
		const telegramResponse = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: TELEGRAM_CHAT_ID,
					text: message,
					disable_web_page_preview: true,
				}),
			}
		)

		const telegramData = await telegramResponse.json()
		console.log('Telegram response:', telegramData)

		if (!telegramResponse.ok) {
			console.error('Telegram API error:', telegramData)

			// Более детальная обработка ошибок
			if (
				telegramData.error_code === 400 &&
				telegramData.description.includes('chat not found')
			) {
				return NextResponse.json(
					{
						error:
							'Чат не найден. Убедитесь, что бот добавлен в группу и ID группы правильный.',
					},
					{ status: 500 }
				)
			}

			return NextResponse.json(
				{ error: `Ошибка Telegram API: ${telegramData.description}` },
				{ status: 500 }
			)
		}

		console.log('Message sent successfully:', telegramData)

		return NextResponse.json({
			success: true,
			message: 'Сообщение успешно отправлено в Telegram',
			messageId: telegramData.result?.message_id,
		})
	} catch (error) {
		console.error('Error sending message:', error)
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
