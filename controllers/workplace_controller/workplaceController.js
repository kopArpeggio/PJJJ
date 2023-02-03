const { sequelize, Workplace } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.getAllWorkplace = async (req, res, next) => {
  try {
    const workplace = await Workplace.findAll();

    res
      .status(200)
      .send({ message: "Get All Workplace Succesful.", data: workplace });
  } catch (error) {
    error.controller = "getAllWorkplace";
    next(error);
  }
};

exports.createWorkPlace = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { password } = req.body;
  try {
    const hasedPassword = await bcrypt.hash(password, 10);

    const workplace = await Workplace.create(
      {
        ...req.body,
        password: hasedPassword,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    res
      .status(201)
      .send({ message: "Create Workplace Succesful.", data: workplace });
  } catch (error) {
    await t.rollback();
    error.controller = "createWorkPlace";
    next(error);
  }
};

exports.updateWorkplace = async (req, res, next) => {
  const { id } = req.params;
  const { companyName } = req.body;
  const t = await sequelize.transaction();
  try {
    //check exiting
    const workplace = await Workplace.findOne({
      where: { id },
    });
    if (!workplace) {
      const error = new Error("Workplace Not Found.");
      error.statusCode = 400;
      throw error;
    }

    //check Duplicate
    const duplicate = await Workplace.findOne({
      where: { [Op.and]: [{ id: { [Op.ne]: id } }, { companyName }] },
    });
    if (duplicate) {
      const error = new Error("Workplace Duplicate.");
      error.statusCode = 400;
      throw error;
    }

    await Workplace.update(
      {
        ...res.body,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({ message: "Update Workplace By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "updateWorkplace";
    next(error);
  }
};

exports.deleteWorkplace = async (req, res, next) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  try {
    //check existing
    const workplace = await Workplace.findOne({ where: { id } });
    if (!workplace) {
      const error = new Error("Workplace Not Found.");
      error.statusCode = 400;
      throw error;
    }

    await Workplace.destroy({
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.status(200).send({ message: "Delete Workplace By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "deleteWorkplace";
    next(error);
  }
};
