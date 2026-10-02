const express = require("express");

const pneuController = require("../controllers/pneuController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

// CREATE
router.post("/", authenticate, authorize("admin"), pneuController.createPneu);
// READ ALL
router.get("/", authenticate, authorize("admin"), pneuController.getAllPneus);
// READ ONE
router.get("/:id",authenticate,authorize("admin"),pneuController.getPneuById);
// UPDATE
router.put("/:id", authenticate, authorize("admin"), pneuController.updatePneu);
// DELETE
router.delete("/:id",authenticate,authorize("admin"),pneuController.deletePneu);

module.exports = router;
