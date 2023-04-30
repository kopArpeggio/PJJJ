const express = require("express");
const { evaluateController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.put(
  "update-evaluate-by-id/:id",
  [passportJWT.isLogin],
  evaluateController.updateEvaluateById
);

module.exports = router;
