const { rateLimit } = require("express-rate-limit");

const rateAuthLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,

  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Limite de requêtes dépassée. Réessayez plus tard.",
  },
});

module.exports = rateAuthLimiter;
