const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", authenticate, authorize("admin"), userController.getAllUsers);
router.post("/", authenticate, authorize("admin"), userController.createUser);

module.exports = router;
