const fs = require("node:fs");

function extractLhrFromHtml(html) {
  const marker = "window.__LIGHTHOUSE_JSON__ = ";
  const i = html.indexOf(marker);
  if (i === -1) return null;
  const start = i + marker.length;

  // JSON ends at the first ";</script>" after marker.
  const end = html.indexOf(";</script>", start);
  if (end === -1) return null;

  const jsonText = html.slice(start, end).trim();
  return JSON.parse(jsonText);
}

function score(x) {
  return Math.round((x?.score ?? 0) * 100);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node scripts/parse-lighthouse.cjs <report.html> [more...]");
  process.exit(1);
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const lhr = extractLhrFromHtml(html);
  if (!lhr?.categories) {
    console.log(`\n${file}\n- Could not parse Lighthouse JSON`);
    continue;
  }

  console.log(`\n${file}`);
  console.log(`- finalUrl: ${lhr.finalUrl}`);
  console.log(`- performance: ${score(lhr.categories.performance)}`);
  console.log(`- accessibility: ${score(lhr.categories.accessibility)}`);
  console.log(`- best-practices: ${score(lhr.categories["best-practices"])}`);
  console.log(`- seo: ${score(lhr.categories.seo)}`);

  const audits = lhr.audits || {};
  const failing = Object.keys(audits)
    .filter((id) => audits[id]?.score !== 1)
    .filter((id) => audits[id]?.scoreDisplayMode === "numeric")
    .map((id) => ({
      id,
      title: audits[id]?.title,
      score: audits[id]?.score,
      displayValue: audits[id]?.displayValue,
    }))
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 8);

  if (failing.length) {
    console.log("- top issues:");
    for (const a of failing) {
      const line = `  - ${a.title} (${a.id}): ${a.displayValue || "needs attention"}`;
      console.log(line);
    }
  }
}

