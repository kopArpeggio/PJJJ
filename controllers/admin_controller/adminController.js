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
      const error = new Error("Admin Duplicate !");
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
      message: "Create Admin Successful.",
      data: admin,
    });
  } catch (error) {
    await t.rollback();
    error.controller = "createAdmin";
    next(error);
  }
};

exports.updateAdmidById = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req?.params;
  const { password } = req?.body;

  const hasedPassword = await bcrypt.hash(password, 10);

  try {
    const exist = await Admin.findOne({ where: { id } });

    if (!exist) {
      const error = new Error("ไม่มีรายชื่อแอดมินนี้อยู่ในระบบ");
      error.statusCode = 400;
      throw error;
    }

    await Admin.update(
      {
        ...req.body,
        password: hasedPassword,
      },
      {
        transaction: t,
        where: { id },
      }
    );

    await t.commit();

    res.status(200).send({ message: "Update Admin By Id Succesful ! " });
  } catch (error) {
    await t.rollback();
    error.controller = "updateAdminById";
    next(error);
  }
};

exports.updateAdminPassword = async (req, res, next) => {
  const t = await sequelize.transaction();

  const { oldPassword, newPassword } = req?.body;
  const { id } = req?.params;
  try {
    const admin = await Admin.findOne({ where: { id } });

    if (!admin) {
      const error = new Error("ไม่มีรายชื่่อคุณอยู่ในระบบ");
      error.statusCode = 400;
      next(error);
    }

    const compare = await bcrypt.compare(
      oldPassword.toString(),
      admin?.password.toString()
    );
    if (!compare) {
      const error = new Error("รหัสผ่านเก่าของคุณไม่ตรงกัน");
      error.statusCode = 400;
      throw error;
    }

    const password = await bcrypt.hash(newPassword.toString(), 10);

    await Admin.update(
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
    error.controller = "updateAdminPassword";
    next(error);
  }
};
