const express = require("express");
const { teacherController } = require("../../controllers");

const router = express.Router();

router.get("/get-all-teacher", teacherController.getAllTeacher);

router.post("/create", teacherController.createTeacher);

router.put("/update-by-id/:id", teacherController.updateTeacher);

router.delete("/delete-by-id/:id", teacherController.deleteTeacher);

module.exports = router;
