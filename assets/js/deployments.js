(function () {
  let deployments = loadData("deployments", startDeployments);

  const stageSelect = document.querySelector("#stage");
  Object.keys(STAGE_NAMES).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = STAGE_NAMES[key];
    stageSelect.append(opt);
  });

  function render() {
    const tbody = document.querySelector("#deploymentTable");
    tbody.innerHTML = "";
    deployments.forEach(item => {
      const percent = item.total > 0 ? Math.round((item.done / item.total) * 100) : 0;
      const bar = document.createElement("div");
      bar.className = "progress";
      const fill = document.createElement("i");
      fill.style.width = percent + "%";
      bar.append(fill);

      const wrap = document.createElement("div");
      wrap.append(bar, document.createTextNode(percent + "% (" + item.done + "/" + item.total + ")"));

      const row = document.createElement("tr");
      row.append(
        makeCell(item.id),
        makeCell(item.client),
        makeCell(item.product),
        makeCell(item.version),
        makeCell(makeBadge(STAGE_NAMES[item.stage] || item.stage, item.stage === "production" ? "good" : "info")),
        makeCell(wrap),
        makeCell(item.owner),
        makeCell(formatDay(item.plannedDate))
      );
      tbody.append(row);
    });
    document.querySelector("#deploymentTableEmpty").hidden = deployments.length > 0;
  }

  document.querySelector("#deploymentForm").addEventListener("submit", event => {
    event.preventDefault();
    const msg = document.querySelector("#deploymentMsg");
    const val = id => document.querySelector("#" + id).value.trim();

    const client = val("client"), product = val("product"), version = val("version");
    const owner = val("owner"), plannedDate = val("plannedDate");
    const done = Number(val("done")), total = Number(val("total"));

    if (!client || !product || !owner || !plannedDate) {
      showMessage(msg, "Заполните все поля.", false);
      return;
    }
    if (!/^v\d+\.\d+\.\d+$/.test(version)) {
      showMessage(msg, "Версия должна быть вида v1.2.3.", false);
      return;
    }
    if (!Number.isInteger(done) || !Number.isInteger(total) || total < 1 || done < 0 || done > total) {
      showMessage(msg, "Шаги: от 0 до общего числа, всего не меньше 1.", false);
      return;
    }

    deployments.push({
      id: nextId("DEP", deployments, 2),
      client, product, version,
      stage: val("stage"), owner, plannedDate, done, total
    });
    saveData("deployments", deployments);
    render();
    event.target.reset();
    document.querySelector("#done").value = 0;
    document.querySelector("#total").value = 4;
    showMessage(msg, "Внедрение добавлено.", true);
  });

  render();
})();
