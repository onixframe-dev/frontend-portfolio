import { z } from "zod";

const contactPattern = /^(?:@[a-zA-Z0-9_]{3,32}|\+?\d[\d\s()-]{6,20})$/;
const letterPattern = /[A-Za-zА-Яа-яЁё]/g;
const wordPattern = /[A-Za-zА-Яа-яЁё]{2,}/g;
const vowelPattern = /[AEIOUYaeiouyАаЕеЁёИиОоУуЫыЭэЮюЯя]/g;
const consonantRunPattern = /[BCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxzБбВвГгДдЖжЗзЙйКкЛлМмНнПпРрСсТтФфХхЦцЧчШшЩщ]{6,}/;
const repeatedPattern = /(.)\1{4,}/;
const mixedDigitWordPattern = /[A-Za-zА-Яа-яЁё]+\d+[A-Za-zА-Яа-яЁё]+/;
const urlPattern = /https?:\/\/|www\./i;

export function normalizeTextValue(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[A-Za-zА-Яа-яЁё]{3,}/g, (word) => {
      const hasLowercase = /[a-zа-яё]/.test(word);
      const hasUppercase = /[A-ZА-ЯЁ]/.test(word);

      if (!hasLowercase && hasUppercase) {
        return word;
      }

      return word.charAt(0) + word.slice(1).toLowerCase();
    });
}

function hasSuspiciousWord(value: string) {
  const words = value.match(wordPattern) ?? [];

  return words.some((word) => {
    if (word.length < 10) {
      return false;
    }

    const lower = word.toLowerCase();
    const letters = lower.split("");
    const uniqueRatio = new Set(letters).size / letters.length;
    const vowels = lower.match(vowelPattern) ?? [];
    const vowelRatio = vowels.length / letters.length;

    if (uniqueRatio < 0.44 || vowelRatio < 0.22 || vowelRatio > 0.68) {
      return true;
    }

    for (let size = 2; size <= 4; size += 1) {
      for (let index = 0; index <= lower.length - size; index += 1) {
        const chunk = lower.slice(index, index + size);
        const repeats = (lower.match(new RegExp(chunk, "g")) ?? []).length;

        if (repeats >= 3 || (size === 2 && word.length >= 10 && repeats >= 2)) {
          return true;
        }
      }
    }

    return false;
  });
}

function hasReadableText(value: string, minWords = 1) {
  const normalized = normalizeTextValue(value);

  if (urlPattern.test(normalized)) {
    return true;
  }

  const letters = normalized.match(letterPattern) ?? [];
  const words = normalized.match(wordPattern) ?? [];
  const vowels = normalized.match(vowelPattern) ?? [];
  const compact = normalized.replace(/\s+/g, "");

  if (compact.length < 2 || letters.length < 2) {
    return false;
  }

  if (letters.length / compact.length < 0.55) {
    return false;
  }

  if (words.length < minWords) {
    return false;
  }

  if (
    repeatedPattern.test(normalized) ||
    consonantRunPattern.test(normalized) ||
    mixedDigitWordPattern.test(normalized) ||
    hasSuspiciousWord(normalized)
  ) {
    return false;
  }

  return vowels.length > 0 || /^[A-ZА-ЯЁ0-9\s./-]+$/.test(normalized);
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя минимум из 2 символов.")
    .max(50, "Имя слишком длинное.")
    .refine((value) => hasReadableText(value), "Введите имя текстом, без случайного набора символов.")
    .transform(normalizeTextValue),
  contact: z
    .string()
    .trim()
    .min(1, "Укажите телефон или Telegram.")
    .regex(contactPattern, "Введите телефон или Telegram в формате @username."),
  message: z
    .string()
    .trim()
    .min(20, "Опишите задачу минимум в 20 символов.")
    .max(1200, "Сообщение слишком длинное.")
    .refine((value) => hasReadableText(value, 3), "Опишите задачу обычным текстом, без случайного набора символов.")
    .transform(normalizeTextValue),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const briefSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Введите название проекта.")
    .max(90, "Название слишком длинное.")
    .refine((value) => hasReadableText(value), "Введите понятное название проекта.")
    .transform(normalizeTextValue),
  business: z
    .string()
    .trim()
    .min(20, "Опишите, чем занимаетесь, минимум в 20 символов.")
    .max(900, "Описание слишком длинное.")
    .refine((value) => hasReadableText(value, 3), "Опишите бизнес обычным текстом, без случайного набора символов.")
    .transform(normalizeTextValue),
  audience: z
    .string()
    .trim()
    .min(5, "Опишите целевую аудиторию.")
    .refine((value) => hasReadableText(value, 2), "Опишите аудиторию обычным текстом.")
    .transform(normalizeTextValue),
  advantage: z
    .string()
    .trim()
    .min(5, "Укажите главное преимущество.")
    .refine((value) => hasReadableText(value, 2), "Укажите преимущество обычным текстом.")
    .transform(normalizeTextValue),
  brandStyle: z.string().min(1),
  inspiration: z
    .string()
    .trim()
    .max(900, "Слишком длинный список референсов.")
    .refine((value) => !value || hasReadableText(value, 2), "Укажите референсы обычным текстом или ссылками.")
    .transform(normalizeTextValue)
    .optional()
    .or(z.literal("")),
  mood: z.string().min(1),
  siteType: z.string().min(1),
  packageKey: z.string().min(1),
  integrations: z.array(z.string()).min(1, "Выберите хотя бы один вариант."),
  deadline: z.string().min(1),
  contactName: z
    .string()
    .trim()
    .min(2, "Введите имя минимум из 2 символов.")
    .max(50, "Имя слишком длинное.")
    .refine((value) => hasReadableText(value), "Введите имя текстом, без случайного набора символов.")
    .transform(normalizeTextValue),
  contactContact: z
    .string()
    .trim()
    .min(1, "Укажите телефон или Telegram.")
    .regex(contactPattern, "Введите телефон или Telegram в формате @username."),
  notes: z
    .string()
    .trim()
    .max(1200, "Пожелания слишком длинные.")
    .refine((value) => !value || hasReadableText(value, 2), "Опишите пожелания обычным текстом.")
    .transform(normalizeTextValue)
    .optional()
    .or(z.literal("")),
});

export type BriefFormValues = z.infer<typeof briefSchema>;

export const briefStepFields: Record<number, Array<keyof BriefFormValues>> = {
  1: ["projectName", "business", "audience", "advantage"],
  2: ["brandStyle", "inspiration", "mood"],
  3: ["siteType", "packageKey", "integrations"],
  4: ["contactName", "contactContact", "deadline", "notes"],
};
