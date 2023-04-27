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
  "/get-all-student-by-status",
  [passportJWT.isLogin],
  studentController.getStudentByDoccumentStatus
);

router.get(
  "/get-all-student-by-branch",
  [passportJWT.isLogin],
  studentController.getStudentByBranch
);

router.get("/get-student-by-approve-company-status/:id", [passportJWT.isLogin], studentController.getStudentByNotApproveWorkplace)

router.get(
  "/get-student-year",
  [passportJWT.isLogin],
  studentController.getStudentByYear
);

router.get(
  "/get-all-student-by-year",
  [passportJWT.isLogin],
  studentController.getAllStudentByYear
);

// router.get(
//   "/get-student-by-id/:id",
//   [passportJWT.isLogin],
//   studentController.getSingleStudentById
// );

router.get(
  "/get-student-by-company",
  [passportJWT.isLogin],
  studentController.getStudentByCompany
);

router.post("/create", [passportJWT.isLogin], studentController.createStudent);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  studentController.updateStudent
);

router.put(
  "/update-password-by-id/:id",
  [passportJWT.isLogin],
  studentController.updateStudentPassword
);

router.delete("/delete-by-id/:id", studentController.deleteStudent);

router.put("/upload-pdf-file", studentController.uploadPdfFile);

module.exports = router;
