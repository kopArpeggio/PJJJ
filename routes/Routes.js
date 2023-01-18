const express = require("express");
const { rootRouter } = require("./v1_routes");

const router = express.Router();

router.use("/", rootRouter);

module.exports = router;
