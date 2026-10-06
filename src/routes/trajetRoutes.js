const express = require("express");

const trajetController = require("../controllers/trajetController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/",authenticate,authorize("admin"),trajetController.createTrajet);
router.get("/",authenticate,authorize("admin"),trajetController.getAllTrajets);
router.get("/:id",authenticate,authorize("admin"),trajetController.getTrajetById);
router.put("/:id",authenticate,authorize("driver", "admin"),trajetController.updateTrajet);
router.put("/:id/terminer",authenticate,authorize("driver", "admin"),trajetController.terminerTrajet);

module.exports = router;
