
(require("dotenv"))
  .config({ override: true });

const path         = require("path");
const { Router }   = require("express");
const { mongoose } = require(
    path.resolve(process.env.APP_PATH, "config", "db.js"));
const router       = Router();


const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);

// GET /api
router.get("/", (req, res, next) => {
  return res.json({
    status        : 0,
    "app.name"    : process.env.APP_NAME,
    "app.version" : process.env.APP_VERSION,
  });
});

router.get("/users-count", (req, res, next) => {
  return User.count()
    .then(payload => res.json({ payload }));
});

module.exports = router;
