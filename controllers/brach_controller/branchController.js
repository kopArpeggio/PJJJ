const { sequelize, Branch, Faculty } = require("../../models");
const { Op } = require("sequelize");

exports.getAllBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findAll({
      include: [{ model: Faculty, where: { status: true }, attributes: [] }],
      attributes: {
        include: [[sequelize.col("Faculty.faculty_name"), "facultyName"]],
        exclude: ["facultyId", "updatedAt", "deletedAt", "createdAt"],
      },
    });

    res
      .status(200)
      .send({ message: "Get All Branch Successful", data: branch });
  } catch (error) {
    error.controller = "getAllBranch";
    next(error);
  }
};

exports.getAllBranchByStatus = async (req, res, next) => {
  try {
    const branch = await Branch.findAll({
      where: { status: true },
      include: [{ model: Faculty, where: { status: true }, attributes: [] }],
      attributes: {
        include: [[sequelize.col("Faculty.faculty_name"), "facultyName"]],
        exclude: ["facultyId", "updatedAt", "deletedAt", "createdAt"],
      },
    });

    res
      .status(200)
      .send({ message: "Get All Branch By Status Successful", data: branch });
  } catch (error) {
    error.controller = "getAllBranchByStatus";
    next(error);
  }
};

exports.createBranch = async (req, res, next) => {
  const { branchName } = req?.body;
  const t = await sequelize.transaction();

  try {
    //check duplicate
    const duplicate = await Branch.findOne({
      where: { branchName },
    });

    if (duplicate) {
      const error = new Error("This Branch is already exist");
      error.statusCode = 400;
      throw error;
    }

    const branch = await Branch.create(req.body, {
      transaction: t,
    });

    await t.commit();

    res.status(201).send({ message: "Create Branch Successful", data: branch });
  } catch (error) {
    await t.rollback();
    error.controller = "createBranch";
    next(error);
  }
};

exports.updateBranchById = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req?.params;

  const { branchName } = req?.body;
  try {
    // Check Exist
    const exist = await Branch.findOne({ where: { id } });
    if (!exist) {
      const error = new Error("Branch Doesn't exist");
      error.statusCode = 400;
      throw error;
    }

    // Check Duplicate
    const duplicate = await Branch.findOne({
      where: { [Op.and]: [{ branchName }, { id: { [Op.ne]: id } }] },
    });

    if (duplicate) {
      const error = new Error("This Branch Already Exist");
      error.statusCode = 400;
      throw error;
    }

    await Branch.update(req.body, {
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.status(200).send({ message: "Update Branch By Id Succesful" });
  } catch (error) {
    await t.rollback();
    error.controller = "updateBrnachById";
    next(error);
  }
};

exports.deleteBranchById = async (req, res, next) => {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    // Check Exist
    const exist = await Branch.findOne({ where: { id } });
    if (!exist) {
      const error = new Error("Branch Doesn't Exist");
      error.statusCode = 400;
      throw error;
    }

    await Branch.destroy({ where: { id } }, { transaction: t });

    await t.commit();

    res.status(200).send({ message: "Delete Branch By Id Successful" });
  } catch (error) {
    await t.rollback();
    error.controller = "deleteBranchById";
    next(error);
  }
};
