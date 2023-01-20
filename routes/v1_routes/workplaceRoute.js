const express = require("express");
const { workplaceController } = require("../../controllers");

const router = express.Router();

router.get("/get-all-workplace", workplaceController.getAllWorkplace);

router.post("/create", workplaceController.createWorkPlace);

router.put("/update-by-id/:id", workplaceController.updateWorkplace);

router.delete("/delete-by-id/:id", workplaceController.deleteWorkplace);

module.exports = router;
