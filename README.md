# Smart Support Hub

Учебная веб-платформа внедрения и сопровождения программного продукта. Команда ведёт внедрения, регистрирует инциденты, контролирует сроки SLA, планирует заявки на изменения и выпускает версии.

Все названия, организации и люди в данных вымышленные.

## Возможности

- **Панель** — 4 показателя (активные внедрения, открытые инциденты, процент SLA, текущая версия) и 2 графика Chart.js (инциденты по приоритетам — bar, заявки по видам — doughnut).
- **Внедрения** — список, этап, процент готовности, добавление записи с проверкой полей.
- **Инциденты** — создание, приоритет, статус, срок SLA, фильтр по статусу, кнопка «Решить».
- **Заявки** — четыре вида сопровождения (corrective, adaptive, perfective, preventive), статус, целевая версия.
- **Релизы** — история версий, подсказка следующего номера (patch / minor / major), добавление релиза.
- Тёмная и светлая тема с сохранением выбора, адаптивный интерфейс (1366, 768, 390 px).
- Данные хранятся в `localStorage` браузера.

## Технологии

HTML5, CSS3 (Grid, Flexbox), JavaScript без фреймворков, localStorage, Chart.js (CDN).

## Структура

```
smart-support-hub/
├── index.html
├── deployments.html
├── incidents.html
├── maintenance.html
├── releases.html
├── assets/
│   ├── css/style.css
│   ├── js/ (data, storage, common, dashboard, deployments, incidents, maintenance, releases)
│   └── img/
├── docs/
│   ├── USER_GUIDE.md
│   └── TESTING.md
├── CHANGELOG.md
└── README.md
```

## Запуск

Откройте папку в VS Code и запустите через расширение **Live Server** (или любой локальный HTTP-сервер, например `python -m http.server`), затем откройте `index.html`. Для графиков нужен интернет (Chart.js подключается через CDN).

Чтобы вернуть начальные данные, очистите localStorage сайта в DevTools (Application → Local Storage → Clear).

## Публикация на GitHub Pages

```bash
git init
git add .
git commit -m "Create Smart Support Hub"
git branch -M main
git remote add origin URL_РЕПОЗИТОРИЯ
git push -u origin main
```

Затем: repository → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**, Folder: **/(root)** → Save.

## Версии

Теги `v1.0.0` и `v1.1.0`, список изменений — в [CHANGELOG.md](CHANGELOG.md).

```bash
git tag -a v1.0.0 -m "Первая версия"
git push origin v1.0.0
```

## Документация

- [Руководство пользователя](docs/USER_GUIDE.md)
- [Сценарии тестирования](docs/TESTING.md)
