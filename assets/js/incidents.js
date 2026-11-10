(function () {
  let incidents = loadData("incidents", startIncidents);

  const prioritySelect = document.querySelector("#priority");
  Object.keys(PRIORITY_NAMES).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = PRIORITY_NAMES[key];
    if (key === "medium") opt.selected = true;
    prioritySelect.append(opt);
  });

  const filter = document.querySelector("#statusFilter");

  function currentList() {
    const value = filter.value;
    return value === "all" ? incidents : incidents.filter(item => item.status === value);
  }

  function renderIncidents(list) {
    const tbody = document.querySelector("#incidentTable");
    tbody.innerHTML = "";

    list.forEach(item => {
      const state = getSlaState(item, settings);
      const slaKind = state === "breached" ? "bad" : state === "met" ? "good" : "warn";
      const prioKind = item.priority === "critical" ? "bad" : item.priority === "high" ? "warn" : "";

      let action = "—";
      if (item.status !== "resolved") {
        action = document.createElement("button");
        action.type = "button";
        action.className = "btn small";
        action.textContent = "Решить";
        action.addEventListener("click", () => resolveIncident(item.id));
      }

      const row = document.createElement("tr");
      row.append(
        makeCell(item.id),
        makeCell(item.title),
        makeCell(makeBadge(PRIORITY_NAMES[item.priority], prioKind)),
        makeCell(STATUS_NAMES[item.status]),
        makeCell(formatDate(item.createdAt)),
        makeCell(makeBadge(slaNames[state], slaKind)),
        makeCell(action)
      );
      tbody.append(row);
    });
    document.querySelector("#incidentTableEmpty").hidden = list.length > 0;
  }

  function resolveIncident(id) {
    const item = incidents.find(incident => incident.id === id);
    if (!item) return;
    item.status = "resolved";
    item.resolvedAt = new Date().toISOString();
    saveData("incidents", incidents);
    renderIncidents(currentList());
  }

  document.querySelector("#incidentForm").addEventListener("submit", event => {
    event.preventDefault();
    const msg = document.querySelector("#incidentMsg");
    const title = document.querySelector("#title").value.trim();
    const priority = document.querySelector("#priority").value;

    if (title === "") {
      showMessage(msg, "Введите описание инцидента.", false);
      return;
    }

    incidents.push({
      id: nextId("INC", incidents, 3),
      title: title,
      priority: priority,
      status: "new",
      createdAt: new Date().toISOString(),
      resolvedAt: null
    });

    saveData("incidents", incidents);
    renderIncidents(currentList());
    event.target.reset();
    prioritySelect.value = "medium";
    showMessage(msg, "Инцидент создан.", true);
  });

  filter.addEventListener("change", () => renderIncidents(currentList()));

  renderIncidents(incidents);
})();
