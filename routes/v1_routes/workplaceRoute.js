const express = require("express");
const { workplaceController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get(
  "/get-all-workplace",
  [passportJWT.isLogin],
  workplaceController.getAllWorkplace
);

router.get(
  "/get-all-workplace-with-status",
  [passportJWT.isLogin],
  workplaceController.getAllWorkplaceWithStatus
);

router.get(
  "/get-workplace-by-id/:id",
  [passportJWT.isLogin],
  workplaceController.getWorkplaceById
);

router.get(
  "/get-workplace-with-student-by-id/:id",
  [passportJWT.isLogin],
  workplaceController.getWorkplaceWithStudentById
);

router.post("/create", workplaceController.createWorkPlace);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  workplaceController.updateWorkplace
);

router.delete(
  "/delete-by-id/:id",
  [passportJWT.isLogin],
  workplaceController.deleteWorkplace
);

module.exports = router;
