const { sequelize, Student, Address } = require("../../models");

exports.getAllStudent = async (req, res, next) => {
  try {
    const student = await Student.findAll({ include: Address });
    res
      .status(200)
      .send({ message: "Get All Student Succesful !", data: student });
  } catch (error) {
    error.controller = "getAllStudent";
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const address = await Address.create(
      {
        ...req.body.address,
      },
      {
        transaction: t,
      }
    );
    console.log(address.id);
    const student = await Student.create(
      {
        ...req.body,
        addressId: address.id,
      },
      { transaction: t }
    );

    await t.commit();

    res
      .status(201)
      .send({ message: "Create Student Succesful.", data: student });
  } catch (error) {
    await t.rollback();
    error.controller = "createStudent";
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  try {
    const student = await Student.findOne({
      where: { id },
    });
    if (!student) {
      const error = new Error("Student Not Found !");
      error.statusCode = 400;
      throw error;
    }

    await Student.update(
      {
        ...req.body,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({ message: "Update Student By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "updateStudent";
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req.params;
  try {
    //check existing
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      const error = new Error("Student Not Found !");
      error.statusCode = 400;
      throw error;
    }

    //update
    await Student.destroy({
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.status(200).send({ message: "Delete Student By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "deleteStudent";
    next(error);
  }
};
