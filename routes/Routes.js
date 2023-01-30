const express = require("express");
const {
  rootRouter,
  studentRouter,
  workplaceRouter,
  teacherRouter,
} = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

router.use("/student", studentRouter);

router.use("/workplace", workplaceRouter);

router.use("/teacher", teacherRouter);

module.exports = router;
