const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "FleetTrackPRO API V2 is running",
    version: "2.0",
  });
});

module.exports = router;
