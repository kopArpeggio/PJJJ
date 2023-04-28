const {
  sequelize,
  Student,
  Address,
  Father,
  Mother,
  Birth,
  Work,
  Branch,
  Workplace,
  Faculty,
  Pdffile,
} = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.getStudentByYear = async (req, res, next) => {
  try {
    const student = await Student.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("year")), "year"]],
    });

    res.status(200).send({ message: "Get All Year Student.", data: student });
  } catch (error) {
    error.controller = "getStudentByYear";
    next(error);
  }
};

exports.getStudentByDoccumentStatus = async (req, res, next) => {
  // req?.query || req?.params
  const { status, year } = req?.query;
  ////////////////////////////

  const { branchId } = req?.user?.teacher?.dataValues;
  try {
    var d = new Date();
    var y = parseInt(d.getFullYear()) + 543;

    const student = await Student.findAll({
      where:
        year && status
          ? {
              [Op.and]: [{ documentStatus: status }, { branchId }, { year }],
            }
          : status
          ? {
              [Op.and]: [{ documentStatus: status }, { branchId }, { year: y }],
            }
          : year
          ? {
              [Op.and]: [{ branchId }, { year: req?.query?.year }],
            }
          : {
              [Op.and]: [{ branchId }, { year: y }],
            },
      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Work.boss_firstname"), "bossFirstname"],
          [sequelize.col("Work.boss_lastname"), "bossLastname"],
          [sequelize.col("Work.boss_position"), "bossPosition"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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
    error.controller = "getStudentByDoccumentStatus";
    next(error);
  }
};

exports.getAllStudentByEvaluate = async (req, res, next) => {
  const { year } = req?.query;
  const { id } = req?.user?.teacher;

  try {
    var d = new Date();
    var y = parseInt(d.getFullYear()) + 543;
    const student = await Student.findAll({
      where: year
        ? {
            [Op.and]: [{ teacherId: id }, { year: req?.query?.year }],
          }
        : {
            [Op.and]: [{ teacherId: id }, { year: y }],
          },

      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Work.boss_firstname"), "bossFirstname"],
          [sequelize.col("Work.boss_lastname"), "bossLastname"],
          [sequelize.col("Work.boss_position"), "bossPosition"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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
      message: "Get All Student By Evaluate Succesful !",
      data: student,
    });
  } catch (error) {
    error.controller = "getAllStudentByEvaluate";
    next(error);
  }
};

exports.getAllStudentEmptyTeacher = async (req, res, next) => {
  const { year } = req?.query;
  try {
    var d = new Date();
    var y = parseInt(d.getFullYear()) + 543;
    const student = await Student.findAll({
      where: year
        ? {
            [Op.and]: [{ teacherId: null }, { year: req?.query?.year }],
          }
        : {
            [Op.and]: [{ teacherId: null }, { year: y }],
          },

      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Work.boss_firstname"), "bossFirstname"],
          [sequelize.col("Work.boss_lastname"), "bossLastname"],
          [sequelize.col("Work.boss_position"), "bossPosition"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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
      message: "Get Student By Empty Teacher Succesful ! ",
      data: student,
    });
  } catch (error) {
    error.controller = "getAllStudentEmptyTeacher";
    next(error);
  }
};

exports.getAllStudentByYear = async (req, res, next) => {
  // req?.query || req?.params
  const { year } = req?.query;
  ////////////////////////////

  try {
    const student = await Student.findAll({
      where: year
        ? {
            [Op.and]: [{ year: req?.query?.year }],
          }
        : "",
      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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
    error.controller = "getStudentByDoccumentStatus";
    next(error);
  }
};

exports.getStudentByCompany = async (req, res, next) => {
  const { status } = req?.query;
  const { id } = req?.user?.workplace?.dataValues;

  try {
    const student = await Student.findAll({
      where: status ? { [Op.and]: [{ documentStatus: status }] } : "",
      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Branch.branch_name"), "branchName"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
        },

        {
          model: Work,
          where: { workplaceId: id },
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
    });
  } catch (error) {
    error.controller = "getAllStudent";
    next(error);
  }
};

exports.getStudentByBranch = async (req, res, next) => {
  const { branchId } = req?.user?.teacher?.dataValues;

  try {
    const student = await Student.findAll({
      where: { branchId },
      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Branch.branch_name"), "branchName"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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
    });
  } catch (error) {
    error.controller = "getAllStudent";
    next(error);
  }
};

exports.getAllStudent = async (req, res, next) => {
  try {
    const student = await Student.findAll({
      attributes: {
        exclude: ["password"],
        include: [
          [sequelize.col("Branch.branch_name"), "branchName"],
          [sequelize.col("Branch.Faculty.faculty_name"), "facultyName"],
          [sequelize.col("Branch.branch_name"), "branchName"],
        ],
      },
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
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
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

    const createBody = {
      ...req.body,
    };

    if (req?.body?.birth) {
      const birth = await Birth.create(
        {
          ...req.body.birth,
        },
        {
          transaction: t,
        }
      );
      createBody.birthId = birth.id;
    }

    if (req?.body?.father) {
      const father = await Father.create(
        {
          ...req.body.father,
        },
        {
          transaction: t,
        }
      );
      createBody.fatherId = father.id;
    }

    if (req?.body?.mother) {
      const mother = await Mother.create(
        {
          ...req.body.mother,
        },
        {
          transaction: t,
        }
      );

      createBody.motherId = mother.id;
    }

    if (req?.body?.oldAddress) {
      const address = await Address.create(
        {
          ...req.body.oldAddress,
        },
        {
          transaction: t,
        }
      );
      createBody.oldAddressId = address.id;
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create(
      {
        ...createBody,
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
    pdfFile,
  } = req?.body;


  try {
    if (req?.body?.stu?.password) {
      const hashedPassword = await bcrypt.hash(req?.body?.stu?.password, 10);
      stu.password = hashedPassword;
    }

    const student = await Student.findOne({
      where: { id },
    });

    if (!student) {
      const error = new Error("Student Not Found !");
      error.statusCode = 400;
      throw error;
    }

    //check duplicate
    let duplicate;
    if (req?.body?.stu?.firstname && req?.body?.stu?.lastname) {
      duplicate = await Student.findOne({
        where: {
          [Op.and]: [
            { firstname: req?.body?.stu?.firstname },
            { lastname: req?.body?.stu?.lastname },
            { id: { [Op.ne]: id } },
          ],
        },
      });
    }

    if (duplicate) {
      const error = new Error("Student Duplicate.");
      error.statusCode = 400;
      throw error;
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

    if (pdfFile) {
      if (!pdfFile?.id) {
        const pdfFile = await Pdffile.create(
          {
            ...req?.body?.pdfFile,
          },
          {
            transaction: t,
          }
        );
        stu.pdfFileId = pdfFile?.id;
      }

      if (pdfFile?.id) {
        await Pdffile.update(
          {
            ...req.body.pdfFile,
          },
          {
            where: { id: pdfFile?.id },
            transaction: t,
          }
        );
      }
    }

    await Student.update(
      {
        ...stu,
        branchId: stu?.branchId,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({
      message: "Update Student By Id Succesful.",
      data: { profilePic: stu?.profilePic },
    });
  } catch (error) {
    await t.rollback();
    error.controller = "updateStudent";
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req?.params;
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

exports.getStudentByNotApproveWorkplace = async (req, res, next) => {
  const { id } = req?.params;

  console.log(id);

  try {
    const work = await Work.findOne({ where: { workplaceId: id } });
    const student = await Student.findOne({ where: { workId: work?.id } });

    res.status(200).send({
      message: "Get Student By Not Approve Workplace Succesful ! ",
      data: student,
    });
  } catch (error) {
    error.controller = "getStudentByNotApproveWorkplace";
    next(error);
  }
};

exports.updateStudentPassword = async (req, res, next) => {
  const t = await sequelize.transaction();

  const { oldPassword, newPassword } = req?.body;
  const { id } = req?.params;
  try {
    const student = await Student.findOne({ where: { id } });

    const compare = await bcrypt.compare(
      oldPassword.toString(),
      student?.password
    );
    if (!compare) {
      const error = new Error("รหัสผ่านของคุณไม่ตรงกัน");
      error.statusCode = 400;
      throw error;
    }

    const password = await bcrypt.hash(newPassword.toString(), 10);

    await Student.update(
      {
        password: password,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({ message: "เปลี่ยนรหัสผ่านเสร็จสิ้น !" });
  } catch (error) {
    await t.rollback();
    error.controller = "updateStudentPassword";
    next(error);
  }
};
