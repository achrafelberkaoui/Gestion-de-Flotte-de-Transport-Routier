const { rateLimit } = require("express-rate-limit");
const { slowDown } = require("express-slow-down");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,

  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Limite de requêtes dépassée. Réessayez plus tard.",
  },
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 20,
  delayMs: (used) => (used - 20) * 250,
  maxDelayMs: 3000,
});

module.exports = {
  rateLimiter,
  speedLimiter,
};
