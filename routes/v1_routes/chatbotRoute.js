const express = require("express");
const { lineBotController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post("/test", lineBotController.test);

module.exports = router;
