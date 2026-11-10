(function () {
  let releases = loadData("releases", startReleases);

  const levelSelect = document.querySelector("#levelSelect");
  const nextEl = document.querySelector("#nextVersion");
  const currentEl = document.querySelector("#relCurrent");

  function updateHint() {
    const current = getCurrentVersion();
    currentEl.textContent = current;
    nextEl.textContent = getNextVersion(current, levelSelect.value);
  }

  function render() {
    const list = document.querySelector("#releaseList");
    list.innerHTML = "";
    const sorted = [...releases].sort((a, b) => compareVersions(b.version, a.version));

    sorted.forEach(rel => {
      const box = document.createElement("article");
      box.className = "release-item";

      const h = document.createElement("h3");
      h.textContent = rel.version + " ";
      h.append(makeBadge(rel.level, rel.level === "major" ? "bad" : rel.level === "minor" ? "info" : "good"));

      const date = document.createElement("div");
      date.className = "hint";
      date.style.marginTop = "0";
      date.textContent = rel.id + " · " + formatDay(rel.date);

      const ul = document.createElement("ul");
      rel.changes.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        ul.append(li);
      });

      box.append(h, date, ul);
      list.append(box);
    });
    updateHint();
  }

  levelSelect.addEventListener("change", updateHint);

  document.querySelector("#releaseForm").addEventListener("submit", event => {
    event.preventDefault();
    const msg = document.querySelector("#releaseMsg");
    const version = document.querySelector("#relVersion").value.trim();
    const date = document.querySelector("#relDate").value;
    const changes = document.querySelector("#relChanges").value
      .split("\n").map(s => s.trim()).filter(Boolean);

    if (!/^v\d+\.\d+\.\d+$/.test(version)) {
      showMessage(msg, "Версия должна быть вида v1.2.3.", false);
      return;
    }
    if (releases.some(r => r.version === version)) {
      showMessage(msg, "Такая версия уже есть.", false);
      return;
    }
    if (!date) {
      showMessage(msg, "Укажите дату.", false);
      return;
    }
    if (changes.length === 0) {
      showMessage(msg, "Добавьте хотя бы одно изменение.", false);
      return;
    }

    releases.push({
      id: nextId("REL", releases, 3),
      version, date,
      level: document.querySelector("#relLevel").value,
      changes
    });
    saveData("releases", releases);
    render();
    document.querySelector("#currentVersion").textContent = getCurrentVersion();
    event.target.reset();
    showMessage(msg, "Релиз добавлен.", true);
  });

  render();
})();
