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

exports.getSingleStudentById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const student = await Student.findOne({
      where: { id },
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
      ],
    });

    res.status(200).send({
      message: "Get Student By Id Succesful !",
      data: student,
    });
  } catch (error) {
    error.controller = "getSingleStudentById";
    next(error);
  }
};

exports.getAllStudent = async (req, res, next) => {
  try {
    const student = await Student.findAll({
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
        workId: work?.id,
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
  const { stu, work, mother, father, birth, newAddress, latlong } = req.body;
  const { password } = req.body.stu;

  console.log(newAddress);
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

    if (birth) {
      if (!birth?.id) {
        const birth = await Birth.create(
          {
            ...birth,
          },
          {
            transaction: t,
          }
        );
        stu.birthId = birth.id;
      }
      if (birth?.id) {
        await Birth.update(
          {
            ...birth,
          },
          {
            where: { id: birth?.id },
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
            ...birth,
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
            ...work,
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
            ...work,
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
