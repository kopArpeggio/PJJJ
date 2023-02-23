const express = require("express");
const { uploadController } = require("../../controllers");

const router = express.Router();

router.post("/upload-file", uploadController.uploadFileImage);


module.exports = router;
