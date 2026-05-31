import express from "express";
import {
  renderDocs,
  renderMemoPosture,
  renderOverview,
  renderPushbackMap,
  renderQuestionLane,
  renderRehearsalRoom,
  renderSample,
  renderVerification
} from "./services/render.js";
import {
  memoPosture,
  payload,
  pushbackMap,
  questionLane,
  rehearsalRoom,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/question-lane", (_req, res) => res.type("html").send(renderQuestionLane()));
  app.get("/pushback-map", (_req, res) => res.type("html").send(renderPushbackMap()));
  app.get("/memo-posture", (_req, res) => res.type("html").send(renderMemoPosture()));
  app.get("/rehearsal-room", (_req, res) => res.type("html").send(renderRehearsalRoom()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/question-lane", (_req, res) => res.json(questionLane()));
  app.get("/api/pushback-map", (_req, res) => res.json(pushbackMap()));
  app.get("/api/memo-posture", (_req, res) => res.json(memoPosture()));
  app.get("/api/rehearsal-room", (_req, res) => res.json(rehearsalRoom()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`boardroom-sparring-partner listening on http://127.0.0.1:${port}`);
  });
}
