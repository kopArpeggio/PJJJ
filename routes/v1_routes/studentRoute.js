const express = require("express");
const { studentController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get(
  "/get-all-student",
  [passportJWT.isLogin],
  studentController.getAllStudent
);

router.get(
  "/get-student-by-id/:id",
  [passportJWT.isLogin],
  studentController.getSingleStudentById
);

router.post("/create", studentController.createStudent);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  studentController.updateStudent
);

router.delete("/delete-by-id/:id", studentController.deleteStudent);

router.put("/upload-pdf-file", studentController.uploadPdfFile);

module.exports = router;
