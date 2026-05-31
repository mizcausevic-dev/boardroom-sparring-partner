# Boardroom Sparring Partner

Board-prep intelligence surface for executive questions, pushback rehearsal, memo posture, and investor-facing readiness across the Kinetic Gain executive-intelligence estate.

- Live: `http://sparring.kineticgain.com/`
- Status: `v0.1-shipped`

## What it does

- question lane showing which themes are ready for board scrutiny and which still need tighter answers
- pushback map tying likely board objections back to evidence freshness, downside, and proof density
- memo posture layer that keeps the board narrative grounded in defensible operating surfaces
- rehearsal room packaging what to lead with, what to de-risk, and which questions leadership should rehearse first
- reproducible CLI and static site from the same synthetic board-prep export

## Local run

```powershell
cd boardroom-sparring-partner
npm install
npm run verify
npm run prerender
```

Then open:

- `/`
- `/question-lane`
- `/pushback-map`
- `/memo-posture`
- `/rehearsal-room`
- `/verification`
- `/docs`

## CLI

```powershell
npx boardroom-sparring-partner fixtures/boardroom-sparring-partner.json --format summary
npx boardroom-sparring-partner fixtures/boardroom-sparring-partner-clean.json --format json
```

## Notes

- synthetic sample data only
- board questions, downside, and memo posture are modeled, not live board packets or investor transcripts
- footer links point to GitHub, LinkedIn, and Kinetic Gain
