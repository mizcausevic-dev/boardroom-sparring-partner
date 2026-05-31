import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { BoardroomItem } from "./types.js";

const [, , filePath = "fixtures/boardroom-sparring-partner.json", format = "--format", output = "summary"] = process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: boardroom-sparring-partner <file> --format <summary|json>");
  process.exit(1);
}

const items = JSON.parse(await readFile(filePath, "utf8")) as BoardroomItem[];
const report = analyze(items);
console.log(output === "json" ? formatJson(report) : formatSummary(report));
