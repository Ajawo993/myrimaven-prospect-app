/* POST /api/analyze  {name, website?, notes?}  ->  "Why is this a prospect?" assessment as JSON */
const P = require("../prompts.js");
const { askClaude, readBody, fail } = require("../lib/server.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  const b = readBody(req);
  const name = String(b.name || "").trim().slice(0, 200);
  if (!name) return res.status(400).json({ error: "Organization name is required" });
  try {
    const text = await askClaude(P.analysis(name, String(b.website || "").slice(0, 200), String(b.notes || "").slice(0, 8000)), 2500);
    const data = P.parseJSON(text);
    if (!data) return res.status(502).json({ error: "The AI answer came back in an unexpected shape" });
    res.status(200).json(P.normAnalysis(data));
  } catch (e) { fail(res, e); }
};
