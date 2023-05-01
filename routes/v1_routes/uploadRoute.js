const express = require("express");
const { uploadController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post(
  "/upload-file",
  [passportJWT.isLogin],
  uploadController.uploadFileImage
);

router.post(
  "/upload-csv-student",
  [passportJWT.isLogin],
  uploadController.uploadFileCsv
);

router.post(
  "/uploads-document-file",
  [passportJWT.isLogin],
  uploadController.uploadFileDocument
);

router.post(
  "/upload-xlsx-lab",
  [passportJWT.isLogin],
  uploadController.uploadFileLab
);

router.post("/upload-xlsx-teachers",[passportJWT.isLogin],uploadController.uploadFilexlsxTeacher)

module.exports = router;
