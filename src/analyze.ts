import type { BoardroomExport, BoardroomItem, BoardroomReport, Finding } from "./types.js";

function finding(
  item: BoardroomItem,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    sector: item.sector,
    theme: item.theme
  };
}

function evaluate(item: BoardroomItem): Finding[] {
  const findings: Finding[] = [];

  if (item.evidenceState !== "CURRENT") {
    findings.push(
      finding(
        item,
        "missing-evidence",
        item.evidenceState === "MISSING" ? "high" : "medium",
        "Evidence is not current enough for board-safe reuse, so this theme should not anchor the next board memo yet."
      )
    );
  }

  if (item.downsideRiskUsd >= 180000) {
    findings.push(
      finding(
        item,
        "high-downside",
        "high",
        "Modeled downside is large enough that leadership should rehearse this pushback before using it as a lead board claim."
      )
    );
  }

  if (item.investorConfidenceScore < 68) {
    findings.push(
      finding(
        item,
        "board-fragility",
        "medium",
        "The board-facing answer is still fragile and likely to attract avoidable follow-up questions."
      )
    );
  }

  if (item.readinessScore >= 78 && item.investorConfidenceScore >= 76 && item.evidenceState === "CURRENT") {
    findings.push(
      finding(
        item,
        "board-defensible",
        "high",
        "This theme is strong enough to defend in a board meeting or investor update now."
      )
    );
  }

  if (item.evidenceState === "CURRENT" && item.readinessScore < 64) {
    findings.push(
      finding(
        item,
        "answer-gap",
        "low",
        "The narrative is outrunning the underlying operating proof, so answers should stay narrower."
      )
    );
  }

  return findings;
}

export function analyze(items: BoardroomItem[], options: { now?: string } = {}): BoardroomReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap(evaluate);
  const count = items.length;
  const averageReadiness = Math.round(items.reduce((sum, item) => sum + item.readinessScore, 0) / count);
  const averageInvestorConfidence = Math.round(
    items.reduce((sum, item) => sum + item.investorConfidenceScore, 0) / count
  );
  const boardDefensibleItems = items.filter(
    (item) => item.readinessScore >= 78 && item.investorConfidenceScore >= 76 && item.evidenceState === "CURRENT"
  ).length;
  const missingEvidenceItems = items.filter((item) => item.evidenceState !== "CURRENT").length;
  const downsideRiskUsd = items.reduce((sum, item) => sum + item.downsideRiskUsd, 0);
  const highFindings = findingsList.filter((item) => item.severity === "high").length;
  const penalty = missingEvidenceItems * 4 + highFindings * 2;

  return {
    generatedAt,
    items: count,
    averageReadiness,
    averageInvestorConfidence,
    boardDefensibleItems,
    missingEvidenceItems,
    downsideRiskUsd,
    findingsList,
    ok: averageReadiness >= 70 && penalty < 28
  };
}

export function toExport(items: BoardroomItem[], now?: string): BoardroomExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
