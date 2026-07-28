import { z } from "zod";

const contactPattern = /^(?:@[a-zA-Z0-9_]{3,32}|\+?\d[\d\s()-]{6,20})$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя минимум из 2 символов")
    .max(50, "Имя слишком длинное"),
  contact: z
    .string()
    .trim()
    .min(1, "Укажите телефон или Telegram")
    .regex(contactPattern, "Введите телефон или Telegram в формате @username"),
  message: z
    .string()
    .trim()
    .min(20, "Опишите задачу минимум в 20 символов")
    .max(1200, "Сообщение слишком длинное"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const briefSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Введите название проекта")
    .max(90, "Название слишком длинное"),
  business: z
    .string()
    .trim()
    .min(20, "Опишите, чем занимаетесь, минимум в 20 символов")
    .max(900, "Описание слишком длинное"),
  audience: z
    .string()
    .trim()
    .min(5, "Опишите целевую аудиторию"),
  advantage: z
    .string()
    .trim()
    .min(5, "Укажите главное преимущество"),
  brandStyle: z.string().min(1),
  inspiration: z
    .string()
    .trim()
    .max(900, "Слишком длинный список референсов")
    .optional()
    .or(z.literal("")),
  mood: z.string().min(1),
  siteType: z.string().min(1),
  packageKey: z.string().min(1),
  integrations: z.array(z.string()).min(1, "Выберите хотя бы один вариант"),
  deadline: z.string().min(1),
  contactName: z
    .string()
    .trim()
    .min(2, "Введите имя минимум из 2 символов")
    .max(50, "Имя слишком длинное"),
  contactContact: z
    .string()
    .trim()
    .min(1, "Укажите телефон или Telegram")
    .regex(contactPattern, "Введите телефон или Telegram в формате @username"),
  notes: z
    .string()
    .trim()
    .max(1200, "Пожелания слишком длинные")
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
