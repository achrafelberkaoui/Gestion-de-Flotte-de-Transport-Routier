const express = require("express");
const remorqueController = require("../controllers/remorqueController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

// CREATE
router.post("/",authenticate,authorize("admin"),remorqueController.createRemorque,);
// READ ALL
router.get("/",authenticate,authorize("admin"),remorqueController.getAllRemorques,);
// READ ONE
router.get("/:id",authenticate,authorize("admin"),remorqueController.getRemorqueById,);
// UPDATE
router.put("/:id",authenticate,authorize("admin"),remorqueController.updateRemorque,);
// DELETE
router.delete("/:id",authenticate,authorize("admin"),remorqueController.deleteRemorque,);
module.exports = router;
