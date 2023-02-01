const express = require("express");
const { rootController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get("/migrate", rootController.migrate);
router.get("/", [passportJWT.isLogin], rootController.test);
router.post("/login", rootController.login);
module.exports = router;
