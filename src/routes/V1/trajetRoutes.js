const express = require("express");

const trajetController = require("../../controllers/trajetController");

const authenticate = require("../../middleware/authMiddleware");
const authorize = require("../../middleware/roleMiddleware");
const validate = require("../../middleware/validate");
const createTrajetSchema = require("../../dto/trajet/createTrajet.dto");
const updateTrajetSchema = require("../../dto/trajet/updateTrajet.dto");
const terminateTrajetSchema = require("../../dto/trajet/terminateTrajet.dto");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createTrajetSchema),
  trajetController.createTrajet,
);
router.get(
  "/",
  authenticate,
  authorize("admin"),
  trajetController.getAllTrajets,
);
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  trajetController.getTrajetById,
);
router.put(
  "/:id",
  authenticate,
  authorize("driver", "admin"),
  validate(updateTrajetSchema),
  trajetController.updateTrajet,
);
router.put(
  "/:id/terminer",
  authenticate,
  authorize("driver", "admin"),
  validate(terminateTrajetSchema),
  trajetController.terminerTrajet,
);
router.get(
  "/:id/pdf",
  authenticate,
  authorize("admin", "driver"),
  trajetController.telechargerPdfTrajet,
);
module.exports = router;
