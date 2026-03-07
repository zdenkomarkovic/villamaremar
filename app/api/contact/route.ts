import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, phone, checkin, checkout, message } = await req.json()

  const API_KEY = process.env.MAILJET_API_KEY
  const SECRET_KEY = process.env.MAILJET_SECRET_KEY
  const SENDER = process.env.SITE_MAIL_SENDER
  const RECEIVER = process.env.SITE_MAIL_RECEIVER

  if (!API_KEY || !SECRET_KEY || !SENDER || !RECEIVER) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const credentials = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64')

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a5c;">Nova poruka sa sajta – Villa Mare Mar</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Ime:</td><td style="padding: 8px;">${name}</td></tr>
        <tr style="background:#f5f5f5;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Telefon:</td><td style="padding: 8px;">${phone || '–'}</td></tr>
        <tr style="background:#f5f5f5;"><td style="padding: 8px; font-weight: bold;">Dolazak:</td><td style="padding: 8px;">${checkin || '–'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Odlazak:</td><td style="padding: 8px;">${checkout || '–'}</td></tr>
      </table>
      <div style="margin-top: 16px;">
        <strong>Poruka:</strong>
        <p style="background:#f5f5f5; padding: 12px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `

  const payload = {
    Messages: [
      {
        From: { Email: SENDER, Name: 'Villa Mare Mar' },
        To: [{ Email: RECEIVER, Name: 'Villa Mare Mar' }],
        ReplyTo: { Email: email, Name: name },
        Subject: `Upit za rezervaciju – ${name}`,
        TextPart: `Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || '–'}\nDolazak: ${checkin || '–'}\nOdlazak: ${checkout || '–'}\n\nPoruka:\n${message}`,
        HTMLPart: htmlBody,
      },
    ],
  }

  const res = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
