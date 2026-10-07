const express = require("express");
const remorqueController = require("../controllers/remorqueController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const createRemorqueSchema = require("../dto/remorque/createRemorque.dto");
const updateRemorqueSchema = require("../dto/remorque/updateRemorque.dto");
const router = express.Router();

// CREATE
router.post("/",authenticate,authorize("admin"), validate(createRemorqueSchema), remorqueController.createRemorque,);
// READ ALL
router.get("/",authenticate,authorize("admin"),remorqueController.getAllRemorques,);
// READ ONE
router.get("/:id",authenticate,authorize("admin"),remorqueController.getRemorqueById,);
// UPDATE
router.put("/:id",authenticate,authorize("admin"), validate(updateRemorqueSchema), remorqueController.updateRemorque,);
// DELETE
router.delete("/:id",authenticate,authorize("admin"),remorqueController.deleteRemorque,);
module.exports = router;
