const express = require("express");
const {
  rootRouter,
  studentRouter,
  workplaceRouter,
  teacherRouter,
  uploadRouter,
  workRouter,
  adminRouter,
  branchRouter,
  facultyRouter,
  linebotRouter,
} = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

router.use("/student", studentRouter);

router.use("/workplace", workplaceRouter);

router.use("/teacher", teacherRouter);

router.use("/upload", uploadRouter);

router.use("/work", workRouter);

router.use("/admin", adminRouter);

router.use("/branch", branchRouter);

router.use("/faculty", facultyRouter);

router.use("/line", linebotRouter)

module.exports = router;
