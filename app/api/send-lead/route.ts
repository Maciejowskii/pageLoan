import { NextRequest, NextResponse } from 'next/server'
import { loanApplicationSchema } from '@/lib/validations'
import { sendEmail } from '@/lib/email'

// Honeypot protection
type SpamCheckData = {
	website?: string
	submissionTime?: number
}

const isSpam = (data: SpamCheckData) => {
	// Sprawdzenie honeypot field (pole ukryte dla botów)
	if (data.website) return true

	// Sprawdzenie minimum czasu wypełnienia (< 2 sekundy = bot)
	if (typeof data.submissionTime === 'number' && data.submissionTime < 2000) return true

	return false
}

export async function POST(request: NextRequest) {
	// CORS dla twojej domeny
	if (request.method === 'OPTIONS') {
		return NextResponse.json(null, { status: 200 })
	}

	try {
		const body = await request.json()

		// Spam check
		if (isSpam(body)) {
			return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
		}

		// ❌ USUNIĘTE: Walidacja reCAPTCHA
		// const recaptchaResponse = await fetch(...)
		// const recaptchaData = await recaptchaResponse.json()
		// if (!recaptchaData.success || recaptchaData.score < 0.5) { ... }

		// Walidacja danych (Zod) - bez usuwania recaptchaToken
		const validatedData = loanApplicationSchema.parse(body)

		// HTML email template
		const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #212121; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f2f2f2; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #003366; margin-bottom: 10px; }
            .field { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e6e6e6; }
            .field-label { font-weight: bold; }
            .footer { background-color: #212121; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nowy wniosek o pożyczkę</h2>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">DANE OSOBOWE</div>
                <div class="field">
                  <span class="field-label">Imię:</span>
                  <span>${validatedData.firstName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Nazwisko:</span>
                  <span>${validatedData.lastName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Email:</span>
                  <span>${validatedData.email}</span>
                </div>
                <div class="field">
                  <span class="field-label">Telefon:</span>
                  <span>${validatedData.phone}</span>
                </div>
                <div class="field">
                  <span class="field-label">PESEL:</span>
                  <span>***${validatedData.pesel.slice(-3)}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">SZCZEGÓŁY POŻYCZKI</div>
                <div class="field">
                  <span class="field-label">Kwota:</span>
                  <span>${validatedData.amount.toLocaleString('pl-PL')} PLN</span>
                </div>
                <div class="field">
                  <span class="field-label">Okres:</span>
                  <span>${validatedData.period} miesięcy</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">INFORMACJE ZAWODOWE</div>
                <div class="field">
                  <span class="field-label">Status:</span>
                  <span>${validatedData.employment}</span>
                </div>
                <div class="field">
                  <span class="field-label">Dochód:</span>
                  <span>${validatedData.income.toLocaleString('pl-PL')} PLN</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">MARKETING</div>
                <div class="field">
                  <span class="field-label">Newsletter:</span>
                  <span>${validatedData.agreeMarketing ? 'Tak' : 'Nie'}</span>
                </div>
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: white; border-radius: 4px;">
                <p><strong>Czas wysłania:</strong> ${new Date().toLocaleString('pl-PL')}</p>
                <p><strong>IP:</strong> ${request.headers.get('x-forwarded-for') || 'unknown'}</p>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} KubusPożyczki - Wygenerowano automatycznie</p>
            </div>
          </div>
        </body>
      </html>
    `

		// Wyślij email na Twoją skrzynkę
		const adminResult = await sendEmail({
			to: process.env.ADMIN_EMAIL!,
			subject: `[NOWY WNIOSEK] ${validatedData.firstName} ${validatedData.lastName} - ${validatedData.amount} PLN`,
			html: htmlContent,
		})

		if (!adminResult.success) {
			return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
		}

		// Opcjonalnie: Wyślij potwierdzenie do użytkownika
		const confirmationEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #212121; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; border-radius: 8px; }
            .content { padding: 20px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Dziękujemy za złożenie wniosku!</h2>
            </div>
            <div class="content">
              <p>Cześć ${validatedData.firstName},</p>
              <p>Twój wniosek o pożyczkę w wysokości <strong>${validatedData.amount.toLocaleString(
								'pl-PL'
							)} PLN</strong> został pomyślnie przesłany.</p>
              
              <p>Wkrótce skontaktujemy się z Tobą na numer telefonu <strong>${
								validatedData.phone
							}</strong> lub email <strong>${validatedData.email}</strong>.</p>
              
              <p>Średni czas weryfikacji wynosi 24-48 godzin.</p>
              
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e6e6e6;">
              
              <p style="color: #666; font-size: 12px;">
                Nie odpowiadaj na ten email. Jeśli masz pytania, odwiedź naszą stronę <a href="${
									process.env.NEXT_PUBLIC_SITE_URL
								}">KubusPożyczki.pl</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

		await sendEmail({
			to: validatedData.email,
			subject: 'Potwierdzenie wniosku - KubusPożyczki',
			html: confirmationEmail,
		})

		return NextResponse.json(
			{
				success: true,
				message: 'Lead submitted successfully',
				messageId: adminResult.messageId,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Send lead error:', error)

		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json({ error: 'Validation error', details: error.message }, { status: 400 })
		}

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
