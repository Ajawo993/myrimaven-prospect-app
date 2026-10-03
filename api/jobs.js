/* GET /api/jobs?company=...&where=...  ->  recent job postings for one employer (Adzuna) */
const { jobPostings, fail } = require("../lib/server.js");

module.exports = async (req, res) => {
  const q = req.query || {};
  const company = String(q.company || "").trim().slice(0, 160);
  if (!company) return res.status(400).json({ error: "company is required" });
  try {
    const data = await jobPostings(company, String(q.where || "").slice(0, 120));
    if (!data) return res.status(501).json({ error: "Job postings are not configured" });
    res.status(200).json(data);
  } catch (e) { fail(res, e); }
};
