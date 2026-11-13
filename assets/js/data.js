// Учебные данные. Все названия и люди вымышленные.
const CURRENT_VERSION = "v1.2.1";

const startDeployments = [
  { id: "DEP-01", client: "Колледж, учебная часть", product: "Система расписания", version: "v1.2.0", stage: "training", owner: "Иванов А.", plannedDate: "2026-11-20", done: 2, total: 3 },
  { id: "DEP-02", client: "Библиотека «Знание»", product: "Электронный каталог", version: "v1.2.1", stage: "setup", owner: "Петрова М.", plannedDate: "2026-12-05", done: 1, total: 4 },
  { id: "DEP-03", client: "Спортивный клуб «Атлет»", product: "Учёт абонементов", version: "v1.1.0", stage: "production", owner: "Сидоров К.", plannedDate: "2026-10-15", done: 5, total: 5 },
  { id: "DEP-04", client: "Школа № 12", product: "Электронный журнал", version: "v1.2.1", stage: "planning", owner: "Иванов А.", plannedDate: "2027-01-18", done: 0, total: 4 }
];

const startIncidents = [
  { id: "INC-001", title: "Не открывается отчёт", priority: "high", status: "in_progress", createdAt: "2026-11-02T10:00:00", resolvedAt: null },
  { id: "INC-002", title: "Ошибка входа в систему", priority: "critical", status: "resolved", createdAt: "2026-11-01T09:00:00", resolvedAt: "2026-11-01T11:30:00" },
  { id: "INC-003", title: "Неверная дата в карточке клиента", priority: "low", status: "new", createdAt: "2026-11-03T14:20:00", resolvedAt: null },
  { id: "INC-004", title: "Медленно загружается список", priority: "medium", status: "resolved", createdAt: "2026-10-30T08:00:00", resolvedAt: "2026-10-31T12:00:00" },
  { id: "INC-005", title: "Не отправляется уведомление", priority: "high", status: "resolved", createdAt: "2026-10-28T10:00:00", resolvedAt: "2026-10-28T17:00:00" },
  { id: "INC-006", title: "Сбой при печати", priority: "medium", status: "new", createdAt: "2026-11-04T09:15:00", resolvedAt: null },
  { id: "INC-007", title: "Не сохраняется настройка темы", priority: "low", status: "in_progress", createdAt: "2026-11-05T11:00:00", resolvedAt: null },
  { id: "INC-008", title: "Не обновляется список клиентов", priority: "low", status: "resolved", createdAt: "2026-10-20T09:00:00", resolvedAt: "2026-10-21T09:00:00" },
  { id: "INC-009", title: "Долго открывается карточка", priority: "medium", status: "resolved", createdAt: "2026-10-21T10:00:00", resolvedAt: "2026-10-21T20:00:00" },
  { id: "INC-010", title: "Не приходит код подтверждения", priority: "high", status: "resolved", createdAt: "2026-10-22T08:00:00", resolvedAt: "2026-10-22T14:00:00" },
  { id: "INC-011", title: "Недоступен вход для всех", priority: "critical", status: "resolved", createdAt: "2026-10-23T09:00:00", resolvedAt: "2026-10-23T12:00:00" },
  { id: "INC-012", title: "Сбой при экспорте таблицы", priority: "medium", status: "resolved", createdAt: "2026-10-24T11:00:00", resolvedAt: "2026-10-25T09:00:00" },
  { id: "INC-013", title: "Неверный шрифт в отчёте", priority: "low", status: "resolved", createdAt: "2026-10-25T10:00:00", resolvedAt: "2026-10-27T10:00:00" },
  { id: "INC-014", title: "Не сохраняется профиль", priority: "high", status: "resolved", createdAt: "2026-10-26T09:00:00", resolvedAt: "2026-10-26T16:00:00" },
  { id: "INC-015", title: "Ошибка базы при запуске", priority: "critical", status: "resolved", createdAt: "2026-10-27T08:00:00", resolvedAt: "2026-10-27T15:00:00" },
  { id: "INC-016", title: "Не работает поиск", priority: "medium", status: "resolved", createdAt: "2026-10-28T09:00:00", resolvedAt: "2026-10-29T17:00:00" },
  { id: "INC-017", title: "Пропали данные в журнале", priority: "high", status: "resolved", createdAt: "2026-10-29T08:00:00", resolvedAt: "2026-10-29T20:00:00" }
];

const startRequests = [
  { id: "REQ-001", title: "Добавить экспорт отчёта в PDF", type: "perfective", status: "planned", targetVersion: "v1.3.0" },
  { id: "REQ-002", title: "Исправить открытие отчёта", type: "corrective", status: "done", targetVersion: "v1.2.1" },
  { id: "REQ-003", title: "Поддержка новой версии браузера", type: "adaptive", status: "new", targetVersion: "v1.3.0" },
  { id: "REQ-004", title: "Обновить устаревшую библиотеку", type: "preventive", status: "planned", targetVersion: "v1.2.2" }
];

const startReleases = [
  { id: "REL-004", version: "v1.2.0", date: "2026-10-20", level: "minor", changes: ["Добавлен модуль обучения", "Улучшен поиск по клиентам"] },
  { id: "REL-005", version: "v1.2.1", date: "2026-11-05", level: "patch", changes: ["Исправлено открытие отчёта", "Обновлено руководство пользователя"] }
];

// Справочники (значение -> подпись)
const STAGE_NAMES = { planning: "Планирование", setup: "Настройка", training: "Обучение", production: "Эксплуатация" };
const PRIORITY_NAMES = { critical: "Критический", high: "Высокий", medium: "Средний", low: "Низкий" };
const STATUS_NAMES = { new: "Новый", in_progress: "В работе", resolved: "Решён" };
const TYPE_NAMES = { corrective: "Корректирующее", adaptive: "Адаптивное", perfective: "Совершенствующее", preventive: "Профилактическое" };
const REQ_STATUS_NAMES = { new: "Новая", planned: "Запланирована", done: "Выполнена" };
const LEVEL_NAMES = { major: "major", minor: "minor", patch: "patch" };
