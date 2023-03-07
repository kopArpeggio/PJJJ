const express = require("express");
const {
  rootRouter,
  studentRouter,
  workplaceRouter,
  teacherRouter,
  uploadRouter,
  workRouter,
  adminRouter,
} = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

router.use("/student", studentRouter);

router.use("/workplace", workplaceRouter);

router.use("/teacher", teacherRouter);

router.use("/upload", uploadRouter);

router.use("/work", workRouter);

router.use("/admin", adminRouter);

module.exports = router;
