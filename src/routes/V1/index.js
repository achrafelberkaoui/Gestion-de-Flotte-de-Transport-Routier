const express = require("express");

const authRoutes = require("../V1/authRoutes");
const userRoutes = require("../V1/userRoutes");
const camionRoutes = require("../V1/camionRoutes");
const remorqueRoutes = require("../V1/remorqueRoutes");
const pneuRoutes = require("../V1/pneuRoutes");
const trajetRoutes = require("../V1/trajetRoutes");
const maintenanceRoutes = require("../V1/maintenanceRoutes");
const rateAuthLimiter = require("../../middleware/rateAuthLimiteMiddleware");

const router = express.Router();

router.use("/auth", rateAuthLimiter, authRoutes);
router.use("/users", userRoutes);
router.use("/camions", camionRoutes);
router.use("/remorques", remorqueRoutes);
router.use("/pneus", pneuRoutes);
router.use("/trajets", trajetRoutes);
router.use("/maintenances", maintenanceRoutes);

module.exports = router;
