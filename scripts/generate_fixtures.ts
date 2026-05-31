import { rm, writeFile } from "node:fs/promises";
import { sampleBoardroomSparringPartner } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = sampleBoardroomSparringPartner.map((item) => ({
    ...item,
    evidenceState: "CURRENT" as const,
    readinessScore: Math.max(item.readinessScore, 76),
    investorConfidenceScore: Math.max(item.investorConfidenceScore, 74),
    priorityBand: item.priorityBand === "MUST_FIX" ? ("SHORE_UP" as const) : item.priorityBand,
    pushbackSummary:
      item.evidenceState === "CURRENT"
        ? item.pushbackSummary
        : `${item.pushbackSummary} Evidence has been refreshed for the clean rehearsal packet.`
  }));

  await writeFile(
    "fixtures/boardroom-sparring-partner.json",
    JSON.stringify(sampleBoardroomSparringPartner, null, 2) + "\n"
  );
  await writeFile(
    "fixtures/boardroom-sparring-partner-clean.json",
    JSON.stringify(clean, null, 2) + "\n"
  );

  for (const file of ["fixtures/exit-room.json", "fixtures/exit-room-clean.json"]) {
    try {
      await rm(file);
    } catch {
      // Ignore missing copied fixtures during scaffold cleanup.
    }
  }
}

await main();
