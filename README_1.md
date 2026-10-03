# Myrimaven Prospect Desk

A prospect discovery and qualification tool for Joan at Myrimaven, built as an MVP for a school project.

Myrimaven has not yet identified a paying organizational customer or a clear ideal customer profile. This tool helps Joan find organizations that may have a career alignment problem, understand why they might be prospects, identify the right contact, and learn from outreach. It is intentionally not a full CRM or sales platform.

## Features (MVP)

1. **Prospect discovery:** filter organizations by signal (employee retention, reskilling, career transitions, workforce pipeline). AI can suggest organizations from a plain-language description.
2. **Organization prospect profile:** organization details, potential problem, evidence, contacts, notes and status in one place.
3. **"Why is this a prospect?" analysis:** potential problems, supporting evidence with sources, unknowns to validate, roles to contact, and reasons it might not fit. No numerical score.
4. **Contact identification and qualification:** name, role, contact details and purchasing authority.
5. **Outreach and discovery notes:** who was contacted, when, the response, why it wasn't a fit, and what was learned.
6. **Follow-up actions:** next action and follow-up date, with overdue follow-ups highlighted.
7. **Prospect status:** Needs Validation, Potential Fit, Contacted, Follow-Up, Not a Fit.
8. **Learnings:** collects not-a-fit reasons and lessons so Myrimaven can see which organizations are worth pursuing.

## Out of scope

Full CRM, mass email, predictive lead scores, automated decision-making, K–12 and career-coach prospecting workflows, contracts and invoicing, and advanced analytics.

## Running it

It is a single HTML file with no build step. It is deployed on Vercel from this repo, and you can also open `index.html` directly in a browser.

### Routes

| Route | Screen | Workflow it serves |
|---|---|---|
| `#/discover` | Discover: sample organizations, signal filters, "Why is this a prospect?" | Workflow 1: Find and investigate a prospect |
| `#/prospects` | Prospects list with follow-ups and status filter | Follow-up actions, prospect status |
| `#/prospects/<id>` | Prospect profile: assessment, evidence, unknowns, contacts, outreach log, next step | Workflow 2: Qualify a prospect; Workflow 3: Contact and learn |
| `#/learnings` | Not-a-fit reasons, lessons, responses by sector | Workflow 3: learning from outreach |

### What saves

Prospects, contacts, outreach and follow-ups save in your browser (localStorage), so they're still there after a reload on the same computer. They don't sync between devices or people.

The AI features (suggesting organizations and the live "Why is this a prospect?" analysis) work in the claude.ai version only. In this deployment they're turned off; the sample organizations use prepared assessments instead.

## Trying it

1. Go to **Prospects** and click **Load 3 examples** to see a warm lead, a referral, and a Not a Fit prospect.
2. In **Discover**, filter by a signal and open **Why is this a prospect?** on a sample organization, then save it.
3. On the prospect, check evidence, add a contact with their purchasing authority, log outreach, and set a next step.
4. Open **Learnings** to see what outreach has taught you.

Sample organizations are fictional.
