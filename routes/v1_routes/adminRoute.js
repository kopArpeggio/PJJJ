const express = require("express");
const { adminController } = require("../../controllers");

const router = express.Router();

router.post("/create", adminController.createAdmin);

module.exports = router;
