import { describe, expect, it } from "vitest";
import {
  memoPosture,
  payload,
  pushbackMap,
  questionLane,
  rehearsalRoom,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

describe("boardroom sparring partner service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the question lane", () => {
    expect(questionLane()[0]?.theme).toBeTruthy();
  });

  it("returns the pushback map", () => {
    expect(pushbackMap()[0]?.downsideRiskUsd).toBeGreaterThan(0);
  });

  it("returns memo-posture entries", () => {
    expect(memoPosture()[0]?.memoAnswer).toBeTruthy();
  });

  it("returns rehearsal-room entries", () => {
    expect(rehearsalRoom()[0]?.downsideRiskUsd).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
