/* POST /api/suggest  {query, region?}  ->  up to 6 suggested organizations, with live job-posting counts when Adzuna is set up */
const P = require("../prompts.js");
const { askClaude, jobPostings, readBody, fail } = require("../lib/server.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  const b = readBody(req);
  try {
    const text = await askClaude(P.suggest(b.query, b.region), 2000);
    const items = P.normSuggest(P.parseJSON(text));
    const counts = await Promise.allSettled(items.map(x => x.kind === "organization" ? jobPostings(x.name, b.region || "") : Promise.resolve(null)));
    counts.forEach((c, i) => { if (c.status === "fulfilled" && c.value) items[i].postings = { count: c.value.count, peopleRoles: c.value.peopleRoles }; });
    res.status(200).json(items);
  } catch (e) { fail(res, e); }
};
