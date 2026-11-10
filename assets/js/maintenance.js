(function () {
  let requests = loadData("requests", startRequests);

  function fillSelect(id, names) {
    const select = document.querySelector("#" + id);
    Object.keys(names).forEach(key => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = names[key];
      select.append(opt);
    });
  }
  fillSelect("reqType", TYPE_NAMES);
  fillSelect("reqStatus", REQ_STATUS_NAMES);

  function render() {
    const tbody = document.querySelector("#requestTable");
    tbody.innerHTML = "";
    requests.forEach(item => {
      const kind = item.status === "done" ? "good" : item.status === "planned" ? "info" : "warn";
      const row = document.createElement("tr");
      row.append(
        makeCell(item.id),
        makeCell(item.title),
        makeCell(TYPE_NAMES[item.type] || item.type),
        makeCell(makeBadge(REQ_STATUS_NAMES[item.status] || item.status, kind)),
        makeCell(item.targetVersion)
      );
      tbody.append(row);
    });
    document.querySelector("#requestTableEmpty").hidden = requests.length > 0;
  }

  document.querySelector("#requestForm").addEventListener("submit", event => {
    event.preventDefault();
    const msg = document.querySelector("#requestMsg");
    const title = document.querySelector("#reqTitle").value.trim();
    const targetVersion = document.querySelector("#targetVersion").value.trim();

    if (title === "") {
      showMessage(msg, "Введите название заявки.", false);
      return;
    }
    if (!/^v\d+\.\d+\.\d+$/.test(targetVersion)) {
      showMessage(msg, "Целевая версия должна быть вида v1.3.0.", false);
      return;
    }

    requests.push({
      id: nextId("REQ", requests, 3),
      title: title,
      type: document.querySelector("#reqType").value,
      status: document.querySelector("#reqStatus").value,
      targetVersion: targetVersion
    });
    saveData("requests", requests);
    render();
    event.target.reset();
    showMessage(msg, "Заявка добавлена.", true);
  });

  render();
})();
