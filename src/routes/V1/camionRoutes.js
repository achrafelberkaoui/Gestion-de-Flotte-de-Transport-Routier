const express = require("express");

const camionController = require("../../controllers/camionController");
const authenticate = require("../../middleware/authMiddleware");
const authorize = require("../../middleware/roleMiddleware");
const createCamionSchema = require("../../dto/camion/createCamion.dto");
const updateCamionSchema = require("../../dto/camion/updateCamion.dto");
const validate = require("../../middleware/validate");
const router = express.Router();

router.post("/",authenticate,authorize("admin"), validate(createCamionSchema),camionController.createCamion);
router.get("/",authenticate,authorize("admin"),camionController.getAllCamions);
router.get("/:id",authenticate,authorize("admin"),camionController.getCamion);
router.put("/:id", authenticate, authorize("admin"), validate(updateCamionSchema), camionController.updateCamion);
router.delete("/:id", authenticate, authorize("admin"), camionController.deleteCamion);

module.exports = router;

