/* GET /api/status  ->  which server features have keys set */
module.exports = (req, res) => {
  res.status(200).json({
    ai: !!process.env.ANTHROPIC_API_KEY,
    jobs: !!(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY)
  });
};
