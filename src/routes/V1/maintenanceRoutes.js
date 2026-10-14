const express = require("express");
const router = express.Router();

const maintenanceController = require("../../controllers/maintenanceController");
const authenticate = require("../../middleware/authMiddleware");
const authorize = require("../../middleware/roleMiddleware");
const validate = require("../../middleware/validate");

const createMaintenanceSchema = require("../../dto/maintenance/createMaintenance.dto");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createMaintenanceSchema),
  maintenanceController.createMaintenance,
);

router.get(
  "/camion/:camionId",
  authenticate,
  authorize("admin"),
  maintenanceController.getMaintenancesByCamion,
);

router.post(
  "/camion/:camionId/verifier",
  authenticate,
  authorize("admin"),
  maintenanceController.verifierMaintenance,
);

module.exports = router;
