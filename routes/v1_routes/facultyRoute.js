const express = require("express");
const { facultyController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get(
  "/get-all-faculty",
  [passportJWT.isLogin],
  facultyController.getAllFaculty
);

router.get(
  "/get-all-faculty-by-status",
  [passportJWT.isLogin],
  facultyController.getAllFacultyByStatus
);

router.post("/create", [passportJWT.isLogin], facultyController.createFaculty);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  facultyController.updateBranchById
);

router.delete(
  "/delete-by-id/:id",
  [passportJWT.isLogin],
  facultyController.deleteFacultyById
);

module.exports = router;
