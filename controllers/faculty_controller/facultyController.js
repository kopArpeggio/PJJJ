const { sequelize, Faculty } = require("../../models");
const { Op } = require("sequelize");

exports.getAllFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findAll();

    res
      .status(200)
      .send({ message: "Get All Faculty Succesful", data: faculty });
  } catch (error) {
    error.controller = "getAllFaculty";
    next(error);
  }
};

exports.getAllFacultyByStatus = async (req, res, next) => {
  try {
    const faculty = await Faculty.findAll({ status: true });

    res
      .status(200)
      .send({ message: "Get All Faculty By Status Successful", data: faculty });
  } catch (error) {
    error.controller = "getAllFacultyById";
    next(error);
  }
};

exports.createFaculty = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { facultyName } = req?.body;

  try {
    // Check Duplicate
    const duplicate = await Faculty.findOne({ where: { facultyName } });
    if (duplicate) {
      const error = new Error("This Faculty Already Exist");
      error.statusCode = 400;
      throw error;
    }

    const faculty = await Faculty.create(req.body, { transaction: t });

    await t.commit();

    res
      .status(201)
      .send({ message: "Create Faculty Successful", data: faculty });
  } catch (error) {
    await t.rollback();
    error.controller = "createFaculty";
    next(error);
  }
};

exports.updateBranchById = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req?.params;

  const { facultyName } = req?.body;
  try {
    // Check Exist
    const exist = await Faculty.findOne({ where: { id } });
    if (!exist) {
      const error = new Error("Faculty Doesn't exist");
      error.statusCode = 400;
      throw error;
    }

    // Check Duplicate
    const duplicate = await Faculty.findOne({
      where: { [Op.and]: [{ facultyName }, { id: { [Op.ne]: id } }] },
    });

    if (duplicate) {
      const error = new Error("This Faculty Already Exist");
      error.statusCode = 400;
      throw error;
    }

    await Faculty.update(req.body, {
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.status(200).send({ message: "Update Faculty By Id Succesful" });
  } catch (error) {
    await t.rollback();
    error.controller = "updateBrnachById";
    next(error);
  }
};

exports.deleteFacultyById = async (req, res, next) => {
  const { id } = req?.params;
  const t = await sequelize.transaction();
  try {
    // Check Exist
    const exist = await Faculty.findOne({ where: { id } });
    if (!exist) {
      const error = new Error("This Faculty Doesn't Exist");
      error.statusCode = 400;
      throw error;
    }

    await Faculty.destroy({ where: { id }, transaction: t });

    await t.commit();

    res.status(200).send({ message: "Delete Faculty By Id Successful" });
  } catch (error) {
    await t.rollback();
    error.controller = "deleteFacultyById";
    next(error);
  }
};
