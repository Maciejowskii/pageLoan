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

// Mapowanie angielskich wartości na polskie nazwy
const employmentLabels: Record<string, string> = {
	'self-employed': 'Własna działalność gospodarcza',
	employed: 'Praca na etacie',
	retired: 'Alimenty',
	other: 'Inne',
	'work-abroad': 'Praca za granicą',
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

		// Walidacja danych (Zod)
		const validatedData = loanApplicationSchema.parse(body)

		// Pobierz polską nazwę zatrudnienia
		const employmentLabel = employmentLabels[validatedData.employment] || validatedData.employment

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
                  <span>${validatedData.pesel}</span>
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
                  <span class="field-label">Status zatrudnienia:</span>
                  <span>${employmentLabel}</span>
                </div>
                <div class="field">
                  <span class="field-label">Miesięczny dochód:</span>
                  <span>${validatedData.income.toLocaleString('pl-PL')} PLN</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">ZGODY MARKETINGOWE</div>
                <div class="field">
                  <span class="field-label">Newsletter:</span>
                  <span>${validatedData.agreeMarketing ? '✅ Tak' : '❌ Nie'}</span>
                </div>
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: white; border-radius: 4px;">
                <p><strong>Czas wysłania:</strong> ${new Date().toLocaleString('pl-PL')}</p>
                <p><strong>IP użytkownika:</strong> ${
									request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
								}</p>
                <p><strong>User Agent:</strong> ${request.headers.get('user-agent') || 'unknown'}</p>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} KubusPożyczki.pl - Email wygenerowany automatycznie</p>
              <p style="margin-top: 5px; font-size: 10px;">Ten email został wysłany z systemu zarządzania wnioskami kredytowymi</p>
            </div>
          </div>
        </body>
      </html>
    `

		// Wyślij email na Twoją skrzynkę
		const adminResult = await sendEmail({
			to: process.env.ADMIN_EMAIL!,
			subject: `[NOWY WNIOSEK] ${validatedData.firstName} ${
				validatedData.lastName
			} - ${validatedData.amount.toLocaleString('pl-PL')} PLN`,
			html: htmlContent,
		})

		if (!adminResult.success) {
			console.error('Failed to send admin email:', adminResult.error)
			return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
		}

		// Wyślij potwierdzenie do użytkownika
		const confirmationEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #212121; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; border-radius: 8px; }
            .content { padding: 20px; line-height: 1.6; background-color: #f9f9f9; }
            .highlight { background-color: #e3f2fd; padding: 15px; border-left: 4px solid #003366; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Dziękujemy za złożenie wniosku!</h2>
            </div>
            <div class="content">
              <p>Dzień dobry ${validatedData.firstName},</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>Twój wniosek został pomyślnie przesłany!</strong></p>
                <p style="margin: 10px 0 0 0;">Kwota: <strong>${validatedData.amount.toLocaleString(
									'pl-PL'
								)} PLN</strong></p>
                <p style="margin: 5px 0 0 0;">Okres: <strong>${validatedData.period} miesięcy</strong></p>
              </div>
              
              <p>Nasz zespół weryfikuje Twój wniosek i wkrótce skontaktujemy się z Tobą:</p>
              <ul>
                <li>📧 Email: <strong>${validatedData.email}</strong></li>
                <li>📱 Telefon: <strong>${validatedData.phone}</strong></li>
              </ul>
              
              <p><strong>Średni czas weryfikacji: 24-48 godzin roboczych</strong></p>
              
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e6e6e6;">
              
              <p style="color: #666; font-size: 12px;">
                ⚠️ Nie odpowiadaj na ten email. W razie pytań skontaktuj się z nami poprzez stronę 
                <a href="${
									process.env.NEXT_PUBLIC_SITE_URL
								}/kontakt" style="color: #003366;">KubusPożyczki.pl/kontakt</a>
              </p>
              
              <p style="color: #666; font-size: 12px; margin-top: 10px;">
                Jeśli nie składałeś tego wniosku, zignoruj ten email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

		await sendEmail({
			to: validatedData.email,
			subject: '✅ Potwierdzenie wniosku o pożyczkę - KubusPożyczki',
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
