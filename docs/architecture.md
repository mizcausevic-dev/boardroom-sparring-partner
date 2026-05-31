# Architecture

Boardroom Sparring Partner is a static-friendly TypeScript board-prep layer for the Kinetic Gain executive-intelligence estate.

- `src/data/sampleVerticalBrief.ts` holds the modeled board-question dataset.
- `src/analyze.ts` scores evidence freshness, downside, board fragility, and board-defensible themes.
- `src/services/verticalBriefService.ts` exposes the question-lane, pushback-map, memo-posture, and rehearsal-room packets used by both the app and prerender step.
- `src/services/render.ts` renders the executive HTML surfaces and the sample JSON output.
- `scripts/prerender.ts` emits the static site, API payloads, `robots.txt`, and `sitemap.xml` for GitHub Pages.
