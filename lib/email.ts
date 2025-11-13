import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: parseInt(process.env.SMTP_PORT || '587'),
	secure: process.env.SMTP_SECURE === 'true', // true dla 465, false dla 587
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
})

interface EmailPayload {
	to: string
	subject: string
	html: string
}

export async function sendEmail(payload: EmailPayload) {
	try {
		const info = await transporter.sendMail({
			from: process.env.FROM_EMAIL,
			...payload,
		})
		console.log('Email sent:', info.messageId)
		return { success: true, messageId: info.messageId }
	} catch (error) {
		console.error('Email error:', error)
		return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
	}
}
