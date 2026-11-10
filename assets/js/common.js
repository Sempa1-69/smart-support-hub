const settings = {
  slaHours: { critical: 4, high: 8, medium: 24, low: 72 }
};

const slaNames = {
  on_track: "В срок",
  breached: "Нарушен",
  met: "Решён вовремя"
};

function getSlaState(incident, settings, now = Date.now()) {
  const hours = settings.slaHours[incident.priority];
  const created = new Date(incident.createdAt).getTime();
  const deadline = created + hours * 60 * 60 * 1000;

  if (incident.status === "resolved") {
    const resolved = new Date(incident.resolvedAt).getTime();
    return resolved <= deadline ? "met" : "breached";
  }
  return now > deadline ? "breached" : "on_track";
}

function getSlaPercent(incidents, settings) {
  const resolved = incidents.filter(item => item.status === "resolved");
  if (resolved.length === 0) return 100;
  const met = resolved.filter(item => getSlaState(item, settings) === "met");
  return Math.round((met.length / resolved.length) * 100);
}

function getNextVersion(current, level) {
  const parts = current.replace("v", "").split(".").map(Number);
  if (level === "major") return `v${parts[0] + 1}.0.0`;
  if (level === "minor") return `v${parts[0]}.${parts[1] + 1}.0`;
  return `v${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

// Сравнение версий вида v1.2.3: возвращает число > 0, если a новее b
function compareVersions(a, b) {
  const pa = a.replace("v", "").split(".").map(Number);
  const pb = b.replace("v", "").split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
}

function getCurrentVersion() {
  const releases = loadData("releases", startReleases);
  if (releases.length === 0) return CURRENT_VERSION;
  return releases.map(r => r.version).sort(compareVersions).pop();
}

function nextId(prefix, list, width) {
  const nums = list.map(x => parseInt(String(x.id).split("-")[1], 10) || 0);
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return prefix + "-" + String(next).padStart(width, "0");
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDay(iso) {
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleDateString("ru-RU");
}

// Безопасное создание строки таблицы (textContent, без innerHTML)
function makeCell(value, className) {
  const td = document.createElement("td");
  if (value instanceof Node) td.append(value);
  else td.textContent = value;
  if (className) td.className = className;
  return td;
}

function makeBadge(text, kind) {
  const span = document.createElement("span");
  span.className = "badge-pill " + (kind || "");
  span.textContent = text;
  return span;
}

// ---------- Тема ----------
function applyTheme() {
  let theme = "dark";
  try { theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
  document.body.classList.toggle("light", theme === "light");
  const btn = document.querySelector("#themeButton");
  if (btn) btn.textContent = theme === "light" ? "🌙 Тёмная" : "☀ Светлая";
}

function initTheme() {
  applyTheme();
  const btn = document.querySelector("#themeButton");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch (e) {}
    applyTheme();
    document.dispatchEvent(new Event("themechange"));
  });
}

// ---------- Общий каркас ----------
function initLayout() {
  initTheme();
  const ver = document.querySelector("#currentVersion");
  if (ver) ver.textContent = getCurrentVersion();

  const toggle = document.querySelector("#menuToggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  const page = document.body.dataset.page;
  document.querySelectorAll(".sidebar a").forEach(a => {
    if (a.dataset.page === page) a.classList.add("active");
  });
}

function showMessage(el, text, ok) {
  el.textContent = text;
  el.className = "form-message " + (ok ? "ok" : "error");
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.hidden = true; }, 4000);
}

document.addEventListener("DOMContentLoaded", initLayout);
