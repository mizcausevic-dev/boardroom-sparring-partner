import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardroomSparringPartner } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });
    expect(report.items).toBe(8);
  });

  it("computes positive readiness and investor confidence", () => {
    const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });
    expect(report.averageReadiness).toBeGreaterThanOrEqual(60);
    expect(report.averageInvestorConfidence).toBeGreaterThanOrEqual(60);
  });

  it("counts board-defensible items and missing evidence", () => {
    const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });
    expect(report.boardDefensibleItems).toBeGreaterThanOrEqual(1);
    expect(report.missingEvidenceItems).toBeGreaterThanOrEqual(1);
  });

  it("emits downside and evidence findings", () => {
    const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "high-downside")).toBe(true);
    expect(
      report.findingsList.some((finding) => finding.code === "missing-evidence" || finding.code === "board-fragility")
    ).toBe(true);
  });

  it("rolls up downside value", () => {
    const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });
    expect(report.downsideRiskUsd).toBeGreaterThan(0);
  });
});
