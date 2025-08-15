const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", authenticateToken, clientController.addClient);
router.post("/checkout", authenticateToken, clientController.checkoutClient);
router.get("/", authenticateToken, clientController.getClients);

module.exports = router;