const express = require("express");

const pneuController = require("../controllers/pneuController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const createPneuSchema = require("../dto/pneu/createPneu.dto");
const updatePneuSchema = require("../dto/pneu/updatePneu.dto");
const router = express.Router();

// CREATE
router.post("/", authenticate, authorize("admin"), validate(createPneuSchema), pneuController.createPneu);
// READ ALL
router.get("/", authenticate, authorize("admin"), pneuController.getAllPneus);
// READ ONE
router.get("/:id",authenticate,authorize("admin"),pneuController.getPneuById);
// UPDATE
router.put("/:id", authenticate, authorize("admin"), validate(updatePneuSchema), pneuController.updatePneu);
// DELETE
router.delete("/:id",authenticate,authorize("admin"),pneuController.deletePneu);

module.exports = router;
