const express = require("express");
const { uploadController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post(
  "/upload-file",
  [passportJWT.isLogin],
  uploadController.uploadFileImage
);

module.exports = router;
