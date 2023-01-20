const express = require("express");
const { rootRouter, studentRouter, workplaceRouter } = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

router.use("/student", studentRouter);

router.use("/workplace", workplaceRouter)

module.exports = router;
