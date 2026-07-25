# Frontend Developer Portfolio

Готовый минимальный проект на Next.js + React + TypeScript.

Внутри:
- главный экран для frontend developer
- каталог проектов
- фильтры по категориям
- секция прайсов в стиле Kwork
- блок About
- адаптивная dark UI-стилистика

## Запуск

```bash
npm install
npm run dev
```

После запуска открой:

```text
http://localhost:3000
```

## Важно

Если после распаковки `npm install` пишет, что нет `package.json`, значит ты находишься не в корневой папке проекта.

В правильной папке должны лежать:

```text
package.json
src/
public/
next.config.mjs
```

## Что менять под себя

Проекты:

```text
src/data/projects.ts
```

Прайсы:

```text
src/components/Pricing.tsx
```

Главный экран:

```text
src/components/Hero.tsx
```

Контакты:

```text
src/components/Header.tsx
src/components/Footer.tsx
```
