import { analyze } from "../analyze.js";
import { sampleBoardroomSparringPartner } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardroomSparringPartner, { now: "2026-05-31T22:10:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageReadiness: report.averageReadiness,
    averageInvestorConfidence: report.averageInvestorConfidence,
    boardDefensibleItems: report.boardDefensibleItems,
    missingEvidenceItems: report.missingEvidenceItems,
    downsideRiskUsd: report.downsideRiskUsd,
    highFindings,
    recommendation:
      "Lead with the executive-intelligence system, AI governance, platform margin, and FinTech; compress biotech and nonprofit into tighter answers; keep PropTech and robotics out of the lead memo until proof improves."
  };
}

export function questionLane() {
  return sampleBoardroomSparringPartner.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    boardQuestion: item.boardQuestion,
    priorityBand: item.priorityBand,
    readinessScore: item.readinessScore,
    pushbackSummary: item.pushbackSummary,
    nextMove: item.nextMove
  }));
}

export function pushbackMap() {
  return sampleBoardroomSparringPartner.map((item) => ({
    theme: item.theme,
    evidenceState: item.evidenceState,
    investorConfidenceScore: item.investorConfidenceScore,
    downsideRiskUsd: item.downsideRiskUsd,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function memoPosture() {
  return sampleBoardroomSparringPartner.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    memoAnswer: item.memoAnswer,
    readinessScore: item.readinessScore,
    investorConfidenceScore: item.investorConfidenceScore
  }));
}

export function rehearsalRoom() {
  return sampleBoardroomSparringPartner.map((item) => ({
    theme: item.theme,
    priorityBand: item.priorityBand,
    downsideRiskUsd: item.downsideRiskUsd,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList.sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic board-prep data only - no live board decks, investor notes, or private call transcripts are included.",
    "Readiness, downside, and investor-confidence values are modeled from the sample review set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package board prep and executive pushback rehearsal.",
    "Company tags and related surfaces are synthetic decision aids rather than audited board records.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    questionLane: questionLane(),
    pushbackMap: pushbackMap(),
    memoPosture: memoPosture(),
    rehearsalRoom: rehearsalRoom(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardroomSparringPartner
  };
}
