require("dotenv").config();

const { Router } = require("express");
const router     = Router();

// GET /api
router.get("/api", (req, res, next) => {
  return res.json({
    status        : 0,
    "app.name"    : process.env.APP_NAME,
    "app.version" : process.env.APP_VERSION,
  });
});

module.exports = router;
