(function () {
  const deployments = loadData("deployments", startDeployments);
  const incidents = loadData("incidents", startIncidents);
  const requests = loadData("requests", startRequests);

  // KPI
  document.querySelector("#kpiDeployments").textContent =
    deployments.filter(d => d.stage !== "production").length;
  document.querySelector("#kpiIncidents").textContent =
    incidents.filter(i => i.status !== "resolved").length;
  document.querySelector("#kpiSla").textContent = getSlaPercent(incidents, settings) + "%";
  document.querySelector("#kpiVersion").textContent = getCurrentVersion();

  // Таблица нарушений SLA
  const tbody = document.querySelector("#breachedTable");
  const breached = incidents.filter(i => getSlaState(i, settings) === "breached");
  breached.forEach(item => {
    const row = document.createElement("tr");
    row.append(
      makeCell(item.id),
      makeCell(item.title),
      makeCell(PRIORITY_NAMES[item.priority]),
      makeCell(STATUS_NAMES[item.status])
    );
    tbody.append(row);
  });
  document.querySelector("#breachedTableEmpty").hidden = breached.length > 0;

  // Графики
  if (typeof Chart === "undefined") {
    document.querySelectorAll(".chart-box").forEach(box => {
      box.textContent = "Не удалось загрузить Chart.js (проверьте интернет).";
    });
    return;
  }

  const levels = ["critical", "high", "medium", "low"];
  const types = ["corrective", "adaptive", "perfective", "preventive"];
  let priorityChart, requestChart;

  function themeColors() {
    const light = document.body.classList.contains("light");
    return { text: light ? "#2b1219" : "#f7ece6", grid: light ? "#ead7d2" : "#3d2230" };
  }

  function draw() {
    const c = themeColors();
    Chart.defaults.color = c.text;
    if (priorityChart) priorityChart.destroy();
    if (requestChart) requestChart.destroy();

    priorityChart = new Chart(document.querySelector("#priorityChart"), {
      type: "bar",
      data: {
        labels: levels.map(l => PRIORITY_NAMES[l]),
        datasets: [{
          label: "Инциденты",
          data: levels.map(l => incidents.filter(i => i.priority === l).length),
          backgroundColor: ["#ff3d6e", "#ffb020", "#b05cff", "#1fd6a0"],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: c.grid } },
          x: { grid: { color: c.grid } }
        }
      }
    });

    requestChart = new Chart(document.querySelector("#requestChart"), {
      type: "doughnut",
      data: {
        labels: types.map(t => TYPE_NAMES[t]),
        datasets: [{
          data: types.map(t => requests.filter(r => r.type === t).length),
          backgroundColor: ["#ff3d6e", "#ffb020", "#1fd6a0", "#b05cff"],
          borderWidth: 3,
          borderColor: document.body.classList.contains("light") ? "#ffffff" : "#1d0e15"
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
    });
  }

  draw();
  document.addEventListener("themechange", draw);
})();
