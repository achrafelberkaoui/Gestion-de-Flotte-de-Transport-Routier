const express = require("express");

const v1Routes = require("./routes/V1");
const v2Routes = require("./routes/V2");
const {
  rateLimiter,
  speedLimiter,
} = require("./middleware/rateLimiteMiddleware");

const app = express();

app.use(express.json());
app.use("/api/v1", v1Routes);
app.use("/api/v2", speedLimiter, rateLimiter, v2Routes);

app.get("/", (req, res) => {
  res.json({
    message: "Fleet Management API is running",
    versions: ["v1", "v2"],
  });
});

module.exports = app;
