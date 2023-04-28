const {
  sequelize,
  Workplace,
  Address,
  Student,
  Work,
} = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.getAllWorkplace = async (req, res, next) => {
  try {
    const workplace = await Workplace.findAll({
      include: [{ model: Address, attributes: [] }],
      attributes: {
        include: [
          [sequelize.col("Address.house_number"), "houseNumber"],
          [sequelize.col("Address.district"), "district"],
          [sequelize.col("Address.amphoe"), "amphoe"],
          [sequelize.col("Address.province"), "province"],
          [sequelize.col("Address.zip_code"), "zipCode"],
          [sequelize.col("Address.latitude"), "latitude"],
          [sequelize.col("Address.longtitude"), "longtitude"],
        ],
        exclude: [
          "password",
          "AddressId",
          "updatedAt",
          "deletedAt",
          "createdAt",
        ],
      },
    });

    res
      .status(200)
      .send({ message: "Get All Workplace Succesful.", data: workplace });
  } catch (error) {
    error.controller = "getAllWorkplace";
    next(error);
  }
};

exports.getAllWorkplaceWithStatus = async (req, res, next) => {
  try {
    const workplace = await Workplace.findAll({
      where: { [Op.and]: [{ status: true }, { approve: true }] },
      include: [{ model: Address, attributes: [] }],
      attributes: {
        include: [
          [sequelize.col("Address.house_number"), "houseNumber"],
          [sequelize.col("Address.district"), "district"],
          [sequelize.col("Address.amphoe"), "amphoe"],
          [sequelize.col("Address.province"), "province"],
          [sequelize.col("Address.zip_code"), "zipCode"],
          [sequelize.col("Address.latitude"), "latitude"],
          [sequelize.col("Address.longtitude"), "longtitude"],
        ],
        exclude: [
          "password",
          "AddressId",
          "updatedAt",
          "deletedAt",
          "createdAt",
        ],
      },
    });

    res
      .status(200)
      .send({ message: "Get All Workplace Succesful.", data: workplace });
  } catch (error) {
    error.controller = "getAllWorkplace";
    next(error);
  }
};

exports.getWorkplaceWithStudentById = async (req, res, next) => {
  const { id } = req?.params;
  try {
    const student = await Student.findAll({
      include: [
        {
          paranoid: false,
          model: Work,
          attributes: [],
          include: [
            {
              model: Workplace,
              attributes: [],
              where: { [Op.and]: [{ status: true }, { approve: true }] },
            },
          ],
          where: { workplaceId: id },
        },
      ],
      attributes: {
        exclude: [
          "password",
          "updatedAt",
          "deletedAt",
          "createdAt",
          "birthId",
          "fatherId",
          "motherId",
          "oldAddressId",
          "newAddressId",
        ],
        include: [
          [sequelize.col("Work.job_title"), "jobTitle"],
          [sequelize.col("Work.job_detail"), "jobDetail"],
        ],
      },
    });

    res.status(200).send({ message: "Get All Workplace", data: student });
  } catch (error) {
    error.controller = "getWorkplaceWithStudentById";
    next(error);
  }
};

exports.getWorkplaceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const workplace = await Workplace.findOne({
      where: { id },
      include: [{ model: Address, attributes: [] }],
      attributes: {
        include: [
          [sequelize.col("Address.house_number"), "houseNumber"],
          [sequelize.col("Address.district"), "district"],
          [sequelize.col("Address.amphoe"), "amphoe"],
          [sequelize.col("Address.province"), "province"],
          [sequelize.col("Address.zip_code"), "zipCode"],
          [sequelize.col("Address.latitude"), "latitude"],
          [sequelize.col("Address.longtitude"), "longtitude"],
        ],
        exclude: [
          "password",
          "AddressId",
          "addressId",
          "updatedAt",
          "deletedAt",
          "createdAt",
        ],
      },
    });

    res
      .status(200)
      .send({ message: "Get Workplace By Id Succesful.", data: workplace });
  } catch (error) {
    error.controller = "getWorkplaceById";
    next(error);
  }
};

exports.getApproveWorkplace = async (req, res, next) => {
  try {
    const company = await Workplace.findAll({
      where: { approve: false },
      include: [{ model: Address, attributes: [] }],
      attributes: {
        include: [
          [sequelize.col("Address.house_number"), "houseNumber"],
          [sequelize.col("Address.district"), "district"],
          [sequelize.col("Address.amphoe"), "amphoe"],
          [sequelize.col("Address.province"), "province"],
          [sequelize.col("Address.zip_code"), "zipCode"],
          [sequelize.col("Address.latitude"), "latitude"],
          [sequelize.col("Address.longtitude"), "longtitude"],
        ],
        exclude: [
          "password",
          "AddressId",
          "updatedAt",
          "deletedAt",
          "createdAt",
        ],
      },
    });

    res.status(200).send({
      message: "Get Not Approve Workplace Succesful ! ",
      data: company,
    });
  } catch (error) {
    error.constroller = "getApproveWorkplace";
    next(error);
  }
};

exports.createWorkPlace = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { password } = req?.body;

  try {
    const hasedPassword = await bcrypt.hash(password, 10);

    const createdAddress = await Address.create(
      {
        ...req?.body,
      },
      {
        transaction: t,
      }
    );

    const workplace = await Workplace.create(
      {
        ...req.body,
        password: hasedPassword,
        addressId: createdAddress?.id,
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

exports.createWorkPlaceByStudent = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { companyName } = req?.body;
  console.log(req?.body);
  try {
    const exist = await Workplace.findOne({ where: { companyName } });

    if (exist) {
      const error = new Error(
        "ไม่สามารถเพิ่มได้เนื่องจากมีชื่อสถานประกอบการนี้ในระบบอยู่แล้ว"
      );
      error.statusCode = 400;
      throw error;
    }

    const createdAddress = await Address.create(
      {
        ...req?.body,
      },
      {
        transaction: t,
      }
    );

    const company = await Workplace.create(
      {
        ...req?.body,
        addressId: createdAddress?.id,
      },
      { transaction: t }
    );

    await t.commit();

    res
      .status(200)
      .send({ message: "Create Company Succesful!", data: company });
  } catch (error) {
    await t.rollback();
    error.controller = "createWorkPlaceByStudent";
    next(error);
  }
};

exports.updateWorkplace = async (req, res, next) => {
  const { id } = req?.params;
  const { password, companyName } = req?.body;
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
      where: {
        [Op.and]: [{ id: { [Op.ne]: id } }, { companyName }],
      },
    });

    if (duplicate) {
      const error = new Error("Workplace Duplicate.");
      error.statusCode = 400;
      throw error;
    }

    const updateWorkplaceBody = {
      ...req?.body,
    };

    if (password) {
      updateWorkplaceBody.password = await bcrypt.hash(password, 10);
    }

    await Workplace.update(updateWorkplaceBody, {
      where: { id },
      transaction: t,
    });

    await Address.update(
      {
        district: updateWorkplaceBody?.district,
        houseNumber: updateWorkplaceBody?.houseNumber,
        amphoe: updateWorkplaceBody?.amphoe,
        province: updateWorkplaceBody?.province,
        zipCode: updateWorkplaceBody?.zipCode,
      },
      {
        where: { id: updateWorkplaceBody?.addressId },
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
  const { id } = req?.params;
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
