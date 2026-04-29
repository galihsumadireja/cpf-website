// js/analysis.js

// =========================================
// 1. Agregasi kondisi (tanpa waktu)
// =========================================
function aggregateCrew(){
  const data = JSON.parse(localStorage.getItem("cpfCrewResponses") || "[]");
  const byStage = {};

  data.forEach(r => {
    Object.values(r.answers).forEach(a => {
      if(!byStage[a.stage]) byStage[a.stage] = [];
      byStage[a.stage].push(a.value);
    });
  });

  const avg = {};
  Object.keys(byStage).forEach(stage => {
    const arr = byStage[stage];
    avg[stage] = (arr.reduce((x,y)=>x+y,0)/arr.length);
  });

  return avg;
}

// =========================================
// 2. Rentang waktu data
// =========================================
function getDataTimeRange(){
  const data = JSON.parse(localStorage.getItem("cpfCrewResponses") || "[]");
  if(data.length === 0) return null;

  const times = data.map(r => new Date(r.timestamp));
  return {
    earliest: new Date(Math.min(...times)),
    latest: new Date(Math.max(...times))
  };
}

// =========================================
// 3. Ambil response dalam rentang waktu
// =========================================
function getResponsesInRange(startDate, endDate) {
  const data = JSON.parse(localStorage.getItem("cpfCrewResponses") || "[]");
  return data.filter(r => {
    const t = new Date(r.timestamp);
    return t >= startDate && t <= endDate;
  });
}

// =========================================
// 4. Agregasi dari response terfilter
// =========================================
function aggregateFromResponses(responses) {
  const byStage = {};

  responses.forEach(r => {
    Object.values(r.answers).forEach(a => {
      if (!byStage[a.stage]) byStage[a.stage] = [];
      byStage[a.stage].push(a.value);
    });
  });

  const avg = {};
  Object.keys(byStage).forEach(stage => {
    const arr = byStage[stage];
    avg[stage] = (arr.reduce((x,y)=>x+y,0)/arr.length);
  });

  return avg;
}

// =========================================
// 5. Arah tren (↑ → ↓)
// =========================================
function getTrend(current, previous) {
  if (previous === undefined) return "→";
  if (current > previous + 0.05) return "↑";
  if (current < previous - 0.05) return "↓";
  return "→";
}