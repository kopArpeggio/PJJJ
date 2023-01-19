const express = require("express");
const { rootRouter, studentRouter } = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

router.use("/student", studentRouter);

module.exports = router;
