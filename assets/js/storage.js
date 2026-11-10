function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Не удалось сохранить данные:", e);
  }
}

function loadData(key, fallback) {
  let raw = null;
  try {
    raw = localStorage.getItem(key);
  } catch (e) {
    return fallback;
  }
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function resetAllData() {
  ["deployments", "incidents", "requests", "releases"].forEach(k => {
    try { localStorage.removeItem(k); } catch (e) {}
  });
}
