export type BoardroomSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "NONPROFIT_FOUNDATION"
  | "PROPTECH"
  | "ROBOTICS"
  | "EXECUTIVE_INTELLIGENCE";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type PriorityBand = "MUST_FIX" | "SHORE_UP" | "DEFEND";

export interface BoardroomItem {
  id: string;
  theme: string;
  sector: BoardroomSector;
  executiveBuyer: string;
  boardQuestion: string;
  priorityBand: PriorityBand;
  readinessScore: number;
  downsideRiskUsd: number;
  investorConfidenceScore: number;
  evidenceState: EvidenceState;
  pushbackSummary: string;
  memoAnswer: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface BoardroomExport {
  generatedAt: string;
  items: BoardroomItem[];
}

export type FindingCode =
  | "missing-evidence"
  | "high-downside"
  | "board-fragility"
  | "board-defensible"
  | "answer-gap";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  message: string;
  sector: BoardroomSector;
  theme: string;
}

export interface BoardroomReport {
  generatedAt: string;
  items: number;
  averageReadiness: number;
  averageInvestorConfidence: number;
  boardDefensibleItems: number;
  missingEvidenceItems: number;
  downsideRiskUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
