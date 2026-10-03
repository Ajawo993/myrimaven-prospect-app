# Myrimaven Prospect Desk

A prospect discovery and qualification tool for Joan at Myrimaven, built as an MVP for a school project.

Myrimaven has not yet identified a paying organizational customer or a clear ideal customer profile. This tool helps Joan find organizations that may have a career alignment problem, see how well each fits her criteria and why, identify the right contact, and learn from outreach. It is intentionally not a full CRM or sales platform.

## Features

1. **Prospect discovery:** sample organizations sorted by fit, filterable by fit rating and by signal (employee retention, reskilling, career transitions, workforce pipeline). AI can suggest real organizations from a plain-language description.
2. **Explainable fit rating:** Strong, Moderate or Weak, based on eight visible criteria drawn from the discovery call with Joan. It is not a prediction (see below).
3. **"Why is this a prospect?" analysis:** potential problems, supporting evidence with sources, unknowns to validate, roles to contact, and reasons it might not fit.
4. **Hiring activity:** recent job postings for an employer from the Adzuna API, used as evidence and as the "active hiring" criterion.
5. **Prospect profile:** details, evidence, contacts, notes and status in one place.
6. **Contacts:** role, purchasing authority, and connection (warm, referral or cold).
7. **Outreach log:** who was contacted, when, the response, why it wasn't a fit, and what was learned. Rejection reasons come from Joan's real outreach.
8. **Follow-ups and status:** next action and date, overdue follow-ups highlighted; Needs Validation, Potential Fit, Contacted, Follow-Up, Not a Fit.
9. **Learnings:** not-a-fit reasons, warm vs. cold reply rates, and responses by sector.
10. **CSV export:** prospects and the outreach log, for use in a spreadsheet.

### How the fit rating works

| Criterion | Must-have | Where it comes from |
|---|---|---|
| Serves adults | Yes | Preset, AI, or Joan |
| Evidence of a career alignment problem | Yes | Preset, AI, or Joan |
| Larger organization (roughly 200+) | | Preset, AI, or Joan |
| Active hiring or workforce change | | Preset, AI, job postings, or Joan |
| Decision-maker reachable | | Contacts with "Decision-maker" authority |
| Open to outside tools | Yes | Preset, AI, Joan, or an "Only uses in-house tools" outreach reason |
| Manageable buying process | | Preset, AI, Joan, or a "Bureaucracy" outreach reason |
| Warm connection | | Contacts marked warm or referral |

Strong = 5 or more met. Moderate = 3 or 4. Weak = 2 or fewer, or "No" on any must-have. Joan can change any criterion on a prospect.

## Out of scope

Full CRM, mass email, predictive lead-conversion scores, automated decision-making, K–12 and career-coach prospecting workflows, contracts and invoicing, and advanced analytics.

## Routes

| Route | Screen | Workflow it serves |
|---|---|---|
| `#/discover` | Discover: organizations sorted by fit, filters, AI suggest and analyze | Workflow 1: Find and investigate a prospect |
| `#/prospects` | Prospect list sorted by fit, follow-ups, status filter, CSV export | Follow-up actions, prospect status |
| `#/prospects/<id>` | Profile: fit rating, assessment, evidence, hiring activity, contacts, outreach log, next step | Workflow 2: Qualify; Workflow 3: Contact and learn |
| `#/learnings` | Not-a-fit reasons, warm vs. cold, responses by sector, lessons | Workflow 3: learning from outreach |

## Project structure

```
index.html        the app (single page, no build step)
prompts.js        AI prompts, shared by the browser and the server
api/status.js     GET  /api/status   which server features are switched on
api/analyze.js    POST /api/analyze  "Why is this a prospect?" assessment (Anthropic API)
api/suggest.js    POST /api/suggest  suggested organizations (Anthropic API + Adzuna counts)
api/jobs.js       GET  /api/jobs     recent job postings for an employer (Adzuna API)
lib/server.js     shared server helpers
```

## Turning on AI and job postings (Vercel)

The app works without any keys: sample organizations, fit ratings, contacts, outreach, follow-ups, learnings and export all run in the browser, and data saves in that browser. AI and job postings switch on when these environment variables are set in Vercel (Project → Settings → Environment Variables), followed by a redeploy:

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys (needs a small amount of prepaid credit) |
| `ADZUNA_APP_ID` and `ADZUNA_APP_KEY` | developer.adzuna.com → register for a free key |
| `ANTHROPIC_MODEL` (optional) | Defaults to `claude-haiku-4-5-20251001` |
| `ADZUNA_COUNTRY` (optional) | Defaults to `ca` (Canada) |

Keys stay on the server and are never sent to the browser. The endpoints are public, so set a monthly spend limit in the Anthropic console.

## Trying it

1. Go to **Prospects** and click **Load 3 examples** to see a warm lead, a referral, and a Not a Fit prospect.
2. In **Discover**, filter to **Strong** fits and open **Why is this a prospect?** on a sample organization, then save it.
3. On the prospect, add a contact who is a decision-maker and watch the fit rating update.
4. Log outreach with the reason "Only uses in-house tools" and watch the rating drop to Weak.
5. Open **Learnings** to see what outreach has taught you, then export the outreach log as CSV.

Sample organizations are fictional.
