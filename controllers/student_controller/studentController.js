const {
  sequelize,
  Student,
  Address,
  Father,
  Mother,
  Birth,
  Work,
  Workplace,
} = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
// const Workplace = require("../../models/Workplace");

exports.getAllStudent = async (req, res, next) => {
  try {
    const student = await Student.findAll({
      include: [
        {
          model: Address,
        },
        {
          model: Father,
        },
        {
          model: Mother,
        },
        {
          model: Birth,
        },
        {
          model: Work,
          include: [
            {
              model: Workplace,
              include: [
                {
                  model: Address,
                },
              ],
            },
          ],
        },

        // { include: [{ model: Work }] },
      ],
    });
    res.status(200).send({
      message: "Get All Student Succesful !",
      data: student,
      whoUserThisFunction: req.user,
    });
  } catch (error) {
    error.controller = "getAllStudent";
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { password, firstname, lastname } = req.body;
  try {
    //check duplicate
    const duplicate = await Student.findOne({
      where: { [Op.and]: [{ firstname }, { lastname }] },
    });

    if (duplicate) {
      const error = new Error("Student Duplicate.");
      error.statusCode = 400;
      throw error;
    }

    const work = await Work.create(
      {
        ...req.body.work,
      },
      {
        transaction: t,
      }
    );

    const birth = await Birth.create(
      {
        ...req.body.birth,
      },
      {
        transaction: t,
      }
    );

    const father = await Father.create(
      {
        ...req.body.father,
      },
      {
        transaction: t,
      }
    );

    const mother = await Mother.create(
      {
        ...req.body.mother,
      },
      {
        transaction: t,
      }
    );

    const address = await Address.create(
      {
        ...req.body.newAddress,
      },
      {
        transaction: t,
      }
    );

    const hasedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create(
      {
        ...req.body,
        workId: work.id,
        birthId: birth.id,
        newAddressId: address.id,
        motherId: mother.id,
        fatherId: father.id,
        password: hasedPassword,
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
  const { password } = req.body;

  try {
    const student = await Student.findOne({
      where: { id },
    });

    if (!student) {
      const error = new Error("Student Not Found !");
      error.statusCode = 400;
      throw error;
    }

    if (password) {
      const hasedpassword = bcrypt.hash(password, 10);

      await Student.update(
        {
          ...req.body,
          password: hasedpassword,
        },
        {
          where: { id },
          transaction: t,
        }
      );
    } else {
      await Student.update(
        {
          ...req.body,
        },
        {
          where: { id },
          transaction: t,
        }
      );
    }

    await Address.update(
      {
        ...req.body.address,
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
