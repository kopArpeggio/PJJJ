const express = require("express");
const { uploadController } = require("../../controllers");

const router = express.Router();

router.post("/upload-file-image", uploadController.uploadFileImage);

router.get("/get-file-image/:filename", uploadController.getFileImage);

module.exports = router;
