# Todo Mobile App

Мобильное приложение для управления задачами, построенное на Ionic с React и TypeScript.

## 🚀 Быстрый старт

### Предварительные требования

Убедитесь, что у вас установлены:
- [Node.js](https://nodejs.org/) (версия 18 или выше)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)
- [Ionic CLI](https://ionicframework.com/docs/cli)

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm start
```

Приложение будет доступно по адресу: `http://localhost:8100`

### Сборка для продакшена

```bash
npm run build
```

### Запуск тестов

```bash
npm test
```

### Запуск e2e тестов с Cypress

```bash
npm run e2e
```

## 📱 Функциональность

- ✅ Аутентификация пользователей
- ✅ Создание, редактирование и удаление задач
- ✅ Фильтрация задач по статусу
- ✅ Защищенные маршруты
- ✅ Адаптивный дизайн

## 🛠 Технологии

- **Ionic** - фреймворк для мобильных приложений
- **React** - библиотека для пользовательского интерфейса
- **TypeScript** - типизированный JavaScript
- **Vite** - сборщик проекта
- **Cypress** - тестирование

## 📁 Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── contexts/       # React контексты
├── pages/         # Страницы приложения
├── services/      # API сервисы
├── types/         # TypeScript типы
└── theme/         # Стили и темы
```

## 🔧 Конфигурация

Основные файлы конфигурации:
- `ionic.config.json` - конфигурация Ionic
- `vite.config.ts` - конфигурация Vite
- `tsconfig.json` - конфигурация TypeScript
- `cypress.config.ts` - конфигурация Cypress

## 📝 Скрипты

- `npm start` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm test` - запуск unit тестов
- `npm run e2e` - запуск e2e тестов
- `npm run lint` - проверка кода

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. 