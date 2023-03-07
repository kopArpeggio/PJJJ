const { sequelize, Admin } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res, next) => {
  const { firstname, lastname, password } = req.body;
  const t = await sequelize.transaction();
  try {
    //check duplicate
    const duplicate = await Admin.findOne({
      where: { [Op.and]: [{ firstname }, { lastname }] },
    });
    if (duplicate) {
      const error = new Error("Teacher Duplicate !");
      error.statusCode = 400;
      throw error;
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create(
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
      data: admin,
    });
  } catch (error) {
    await t.rollback();
    error.controller = "createTeacher";
    next(error);
  }
};
