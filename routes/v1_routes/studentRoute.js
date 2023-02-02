const express = require("express");
const { studentController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get(
  "/get-all-student",
  [passportJWT.isLogin],
  studentController.getAllStudent
);

router.post("/create", studentController.createStudent);

router.put("/update-by-id/:id", studentController.updateStudent);

router.delete("/delete-by-id/:id", studentController.deleteStudent);


module.exports = router;
