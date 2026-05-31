import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderDocs,
  renderMemoPosture,
  renderOverview,
  renderPushbackMap,
  renderQuestionLane,
  renderRehearsalRoom,
  renderSample,
  renderVerification
} from "../src/services/render.js";
import {
  memoPosture,
  payload,
  pushbackMap,
  questionLane,
  rehearsalRoom,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

await rm(outDir, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("question-lane", "index.html")]: renderQuestionLane(),
  [path.join("pushback-map", "index.html")]: renderPushbackMap(),
  [path.join("memo-posture", "index.html")]: renderMemoPosture(),
  [path.join("rehearsal-room", "index.html")]: renderRehearsalRoom(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://sparring.kineticgain.com/sitemap.xml\n",
  "sitemap.xml":
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sparring.kineticgain.com/</loc></url><url><loc>https://sparring.kineticgain.com/question-lane/</loc></url><url><loc>https://sparring.kineticgain.com/pushback-map/</loc></url><url><loc>https://sparring.kineticgain.com/memo-posture/</loc></url><url><loc>https://sparring.kineticgain.com/rehearsal-room/</loc></url><url><loc>https://sparring.kineticgain.com/verification/</loc></url><url><loc>https://sparring.kineticgain.com/docs/</loc></url></urlset>',
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "question-lane.json")]: JSON.stringify(questionLane(), null, 2),
  [path.join("api", "pushback-map.json")]: JSON.stringify(pushbackMap(), null, 2),
  [path.join("api", "memo-posture.json")]: JSON.stringify(memoPosture(), null, 2),
  [path.join("api", "rehearsal-room.json")]: JSON.stringify(rehearsalRoom(), null, 2),
  [path.join("api", "risk-map.json")]: JSON.stringify(riskMap(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
