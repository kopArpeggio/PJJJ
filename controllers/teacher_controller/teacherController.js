const { sequelize, Teacher, Branch, Faculty } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.getAllTeacher = async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll({
      include: [{ model: Branch, attributes: [], include: Faculty }],
      attributes: {
        include: [
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Branch.branch_name"), "branchName"],
        ],
        exclude: ["password", "updatedAt", "deletedAt", "createdAt"],
      },
    });

    res.status(200).send({
      message: "Get All Teacher Succesful.",
      data: teachers,
    });
  } catch (error) {
    error.controller = "GetAllTeacher";
    next(error);
  }
};

exports.createTeacher = async (req, res, next) => {
  const { firstname, lastname, password } = req?.body;
  const t = await sequelize.transaction();
  try {
    //check duplicate
    const duplicate = await Teacher.findOne({
      where: { [Op.and]: [{ firstname }, { lastname }] },
    });
    if (duplicate) {
      const error = new Error("Teacher Duplicate !");
      error.statusCode = 400;
      throw error;
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create(
      {
        ...req.body,
        password: hasedPassword,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    res.status(201).send({
      message: "Create Teacher Successful.",
      data: teacher,
    });
  } catch (error) {
    await t.rollback();
    error.controller = "createTeacher";
    next(error);
  }
};

exports.updateTeacher = async (req, res, next) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  const t = await sequelize.transaction();

  try {
    //check existing
    const teacher = await Teacher.findOne({ where: { id } });
    if (!teacher) {
      const error = new Error("Teacher Not Found.");
      error.StatusCode = 400;
      throw error;
    }

    //check duplicate
    const duplicate = await Teacher.findOne({
      where: {
        [Op.and]: [{ firstname }, { lastname }, { id: { [Op.ne]: id } }],
      },
    });
    if (duplicate) {
      const error = new Error("Teacher Duplicate !");
      error.statusCode = 400;
      throw error;
    }

    await Teacher.update(
      {
        ...req.body,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({ message: "Update Teacher By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "updateTeacher";
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  try {
    const teacher = await Teacher.findOne({
      where: { id },
    });
    if (!teacher) {
      const error = new Error("Teacher Not Found.");
      error.statusCode = 400;
      throw error;
    }

    await Teacher.destroy({
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.status(200).send({ message: "Delete Teacher By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "deleteTeacher";
    next(error);
  }
};
