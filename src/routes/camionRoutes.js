const express = require("express");

const camionController = require("../controllers/camionController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/",authenticate,authorize("admin"),camionController.createCamion);
router.get("/",authenticate,authorize("admin"),camionController.getAllCamions);
router.get("/:id",authenticate,authorize("admin"),camionController.getCamion);
router.put("/:id", authenticate, authorize("admin"), camionController.updateCamion);
router.delete("/:id", authenticate, authorize("admin"), camionController.deleteCamion);

module.exports = router;

