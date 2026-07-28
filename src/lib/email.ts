type EmailPayload = {
  subject: string;
  text: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO = "onixframe.dev@gmail.com";
const DEFAULT_FROM = "OnixFrame <onboarding@resend.dev>";

export async function sendEmail({ subject, text }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      message: "Email service is not configured",
    };
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || DEFAULT_FROM,
      to: process.env.MAIL_TO || DEFAULT_TO,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: await response.text(),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: "Email sent",
  };
}
