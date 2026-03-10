import nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
}

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
    process.env.SMTP_PORT?.trim() &&
    process.env.SMTP_FROM?.trim(),
  );
}

export async function sendEmail(payload: EmailPayload): Promise<{ sent: boolean; reason?: string }> {
  if (!smtpConfigured()) {
    return { sent: false, reason: 'SMTP is not configured.' };
  }

  const port = Number.parseInt(process.env.SMTP_PORT ?? '', 10);
  if (!Number.isFinite(port) || port < 1) {
    return { sent: false, reason: 'SMTP_PORT is invalid.' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER?.trim()
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS ?? '',
          }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    });

    return { sent: true };
  } catch (error) {
    return { sent: false, reason: error instanceof Error ? error.message : 'SMTP send failed.' };
  }
}
