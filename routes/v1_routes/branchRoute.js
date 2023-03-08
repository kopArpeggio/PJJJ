const express = require("express");
const { branchController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post("/create", [passportJWT.isLogin], branchController.createBranch);

router.put(
  "/update-by-id/:id",
  [passportJWT.isLogin],
  branchController.updateBranchById
);

router.get(
  "/get-all-branch",
  [passportJWT.isLogin],
  branchController.getAllBranch
);

router.get(
  "/get-all-branch-by-status",
  [passportJWT.isLogin],
  branchController.getAllBranchByStatus
);

router.delete(
  "/delete-by-id/:id",
  [passportJWT.isLogin],
  branchController.deleteBranchById
);

module.exports = router;
