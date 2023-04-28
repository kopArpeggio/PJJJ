const express = require("express");
const { adminController } = require("../../controllers");
const passport = require("passport");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post("/create", adminController.createAdmin);

router.put(
  "/update-admin-password-by-id/:id",
  [passportJWT.isLogin],
  adminController.updateAdminPassword
);

module.exports = router;
