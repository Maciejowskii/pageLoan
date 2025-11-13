import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const validatedData = contactSchema.parse(body)

		const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; color: #212121;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003366;">Nowa wiadomość kontaktowa</h2>
            <p><strong>Imię i nazwisko:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Temat:</strong> ${validatedData.subject}</p>
            <hr />
            <p><strong>Wiadomość:</strong></p>
            <p>${validatedData.message}</p>
          </div>
        </body>
      </html>
    `

		await sendEmail({
			to: process.env.ADMIN_EMAIL!,
			subject: `[KONTAKT] ${validatedData.subject}`,
			html: htmlContent,
		})

		return NextResponse.json({ success: true, message: 'Email sent' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
	}
}
