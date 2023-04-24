const express = require("express");
const { teacherController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get(
  "/get-all-teacher",
  [passportJWT.isLogin],
  teacherController.getAllTeacher
);

router.post("/create", [passportJWT.isLogin], teacherController.createTeacher);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  teacherController.updateTeacher
);

router.delete(
  "/delete-by-id/:id",
  [passportJWT.isLogin],
  teacherController.deleteTeacher
);

router.put(
  "/update-teacher-password-by-id/:id",
  [passportJWT.isLogin],
  teacherController.updateTeacherPassword
);

module.exports = router;
