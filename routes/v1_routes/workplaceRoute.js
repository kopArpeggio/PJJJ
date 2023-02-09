const express = require("express");
const { workplaceController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get("/get-all-workplace",[passportJWT.isLogin], workplaceController.getAllWorkplace);

router.post("/create", workplaceController.createWorkPlace);

router.put("/update-by-id/:id", workplaceController.updateWorkplace);

router.delete("/delete-by-id/:id", workplaceController.deleteWorkplace);

module.exports = router;
