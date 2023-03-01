const express = require("express");
const { workController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  workController.updateWorkById
);


module.exports = router;
