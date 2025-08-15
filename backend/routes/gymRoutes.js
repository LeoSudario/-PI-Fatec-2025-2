const express = require("express");
const router = express.Router();
const gymController = require("../controllers/gymController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", authenticateToken, gymController.createGym);
router.get("/", authenticateToken, gymController.getGyms);
router.delete("/:id", authenticateToken, gymController.deleteGym);

module.exports = router;