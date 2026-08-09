import { escapeTelegramHtml } from "@/lib/telegram";

type ContactType = "telegram" | "instagram" | "email" | "phone" | "other";

type ContactMethod = {
  type: ContactType;
  label: string;
  value: string;
  href?: string;
};

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const instagramUrlPattern = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9._]{1,30})\/?/gi;
const telegramUrlPattern = /(?:https?:\/\/)?(?:t\.me|telegram\.me)\/([A-Za-z0-9_]{3,32})\/?/gi;
const phonePattern = /\+?\d[\d\s()-]{6,20}\d/g;
const handlePattern = /@[A-Za-z0-9._]{3,32}/g;
const instagramHintPattern = /(?:instagram|insta|inst|инстаграм|инста)/i;

function uniqueByValue(methods: ContactMethod[]) {
  const seen = new Set<string>();

  return methods.filter((method) => {
    const key = `${method.type}:${method.value.toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function detectContactMethods(contact: string): ContactMethod[] {
  const methods: ContactMethod[] = [];
  let cleaned = contact;

  for (const match of Array.from(contact.matchAll(instagramUrlPattern))) {
    const username = match[1];
    methods.push({
      type: "instagram",
      label: "Instagram",
      value: `@${username}`,
      href: `https://www.instagram.com/${username}/`,
    });
    cleaned = cleaned.replace(match[0], " ");
  }

  for (const match of Array.from(contact.matchAll(telegramUrlPattern))) {
    const username = match[1];
    methods.push({
      type: "telegram",
      label: "Telegram",
      value: `@${username}`,
      href: `https://t.me/${username}`,
    });
    cleaned = cleaned.replace(match[0], " ");
  }

  for (const match of Array.from(cleaned.matchAll(emailPattern))) {
    const email = match[0];
    methods.push({
      type: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    });
    cleaned = cleaned.replace(email, " ");
  }

  for (const match of Array.from(cleaned.matchAll(phonePattern))) {
    const phone = match[0].trim();
    methods.push({
      type: "phone",
      label: "Телефон",
      value: phone,
      href: `tel:${normalizePhone(phone)}`,
    });
    cleaned = cleaned.replace(match[0], " ");
  }

  const isInstagramHandle = instagramHintPattern.test(contact);

  for (const match of Array.from(cleaned.matchAll(handlePattern))) {
    const handle = match[0];
    const username = handle.slice(1);
    methods.push({
      type: isInstagramHandle ? "instagram" : "telegram",
      label: isInstagramHandle ? "Instagram" : "Telegram",
      value: handle,
      href: isInstagramHandle ? `https://www.instagram.com/${username}/` : `https://t.me/${username}`,
    });
    cleaned = cleaned.replace(handle, " ");
  }

  if (!methods.length) {
    methods.push({
      type: "other",
      label: "Контакт",
      value: contact,
    });
  }

  return uniqueByValue(methods);
}

export function formatContactForEmail(contact: string) {
  return detectContactMethods(contact)
    .map((method) => `${method.label}: ${method.value}${method.href ? ` (${method.href})` : ""}`)
    .join("\n");
}

export function formatContactForTelegram(contact: string) {
  return detectContactMethods(contact)
    .map((method) => {
      const label = escapeTelegramHtml(method.label);
      const value = escapeTelegramHtml(method.value);

      if (!method.href) {
        return `${label}: <code>${value}</code>`;
      }

      return `${label}: <a href="${escapeTelegramHtml(method.href)}">${value}</a>`;
    })
    .join("\n");
}
