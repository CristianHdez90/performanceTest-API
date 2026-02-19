const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('summary.json', 'utf8'));
const report = fs.readFileSync('report.json', 'utf8');

const historyFile = 'performance-history/history.json';
const latestSummary = 'performance-history/summary-latest.json';
const latestReport = 'performance-history/report-latest.json';

let history = [];

if (fs.existsSync(historyFile)) {
  history = JSON.parse(fs.readFileSync(historyFile));
}

const run = {
  date: new Date().toISOString(),
  totalReq: summary.metrics.http_reqs.values.count,
  failRate: summary.metrics.http_req_failed.values.rate,
  avgDuration: summary.metrics.http_req_duration.values.avg,
  p95: summary.metrics.http_req_duration.values["p(95)"]
};

history.push(run);

// Guardar histórico acumulado
fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

// Guardar latest
fs.writeFileSync(latestSummary, JSON.stringify(summary, null, 2));
fs.writeFileSync(latestReport, report);

console.log("✔ Performance history updated");

