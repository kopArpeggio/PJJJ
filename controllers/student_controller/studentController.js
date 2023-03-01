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

exports.getAllStudent = async (req, res, next) => {
  try {
    const student = await Student.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Address,
          as: "oldAddress",
        },
        {
          model: Address,
          as: "newAddress",
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
        ...req.body.oldAddress,
      },
      {
        transaction: t,
      }
    );

    const hasedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create(
      {
        ...req.body,
        birthId: birth?.id,
        oldAddressId: address?.id,
        motherId: mother?.id,
        fatherId: father?.id,
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
  const {
    stu,
    work,
    mother,
    father,
    birthData,
    newAddress,
    latlong,
    finalAddress,
  } = req?.body;

  var password;
  if (req?.body?.stu?.password) {
    password = req?.body?.stu?.password;
  }

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
      const hashedPassword = await bcrypt.hash(password, 10);
      stu.password = hashedPassword;
    }

    const updateBodyAddress = {
      ...newAddress,
      latitude: latlong?.latitude,
      longtitude: latlong?.longtitude,
    };

    if (newAddress) {
      if (!newAddress?.id) {
        const address = await Address.create(
          {
            ...updateBodyAddress,
          },
          {
            transaction: t,
          }
        );
        stu.newAddressId = address.id;
      }

      if (newAddress?.id) {
        await Address.update(
          {
            ...updateBodyAddress,
          },
          {
            where: { id: newAddress?.id },
            transaction: t,
          }
        );
      }
    }

    if (birthData) {
      if (!birthData?.id) {
        const birth = await Birth.create(
          {
            ...req.body.birthData,
          },
          {
            transaction: t,
          }
        );
        stu.birthId = birth?.id;
      }
      if (birthData?.id) {
        await Birth.update(
          {
            ...req.body.birthData,
          },
          {
            where: { id: birthData?.id },
            transaction: t,
          }
        );
      }
    }

    if (father) {
      if (!father?.id) {
        const father = await Father.create(
          {
            ...father,
          },
          {
            transaction: t,
          }
        );
        stu.fatherId = father?.id;
      }

      if (father?.id) {
        await Father.update(
          {
            ...father,
          },
          {
            where: { id: father?.id },
            transaction: t,
          }
        );
      }
    }

    if (mother) {
      if (!mother?.id) {
        const mother = await Mother.create(
          {
            ...mother,
          },
          {
            transaction: t,
          }
        );
        stu.motherId = mother?.id;
      }

      if (mother?.id) {
        await Mother.update(
          {
            ...mother,
          },
          {
            where: { id: mother?.id },
            transaction: t,
          }
        );
      }
    }

    if (work) {
      if (!work?.id) {
        const work = await Work.create(
          {
            ...req?.body?.work,
            workplaceId: finalAddress?.id,
          },
          {
            transaction: t,
          }
        );
        stu.workId = work.id;
      }

      if (work?.id) {
        await Work.update(
          {
            ...req.body.work,
            workplaceId: finalAddress?.id,
          },
          {
            where: { id: work?.id },
            transaction: t,
          }
        );
      }
    }

    await Student.update(
      {
        ...stu,
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

exports.uploadPdfFile = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    await Student.update(
      {
        filePdfPath: req.file.path,
      },
      {
        transaction: t,
        where: { id: 1 },
      }
    );

    await t.commit();

    res.status(200).send({ message: "Upload Document Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "uploadPdfFile";
    next(error);
  }
};
