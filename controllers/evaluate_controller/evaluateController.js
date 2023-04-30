const { Evaluate, sequelize } = require("../../models");

exports.updateEvaluateById = async (req, res, next) => {
  const t = await sequelize.transaction();

  const { id } = req?.params;
  try {
    const exist = await Evaluate.findOne({ where: { id } });

    if (!exist) {
      const error = new Error("ไม่มีนักศึกษานี้อยู่ในระบบ");
      error.statusCode = "400";
      throw error;
    }

    await Evaluate.update(req?.body, { where: { id }, transaction: t });

    await t.commit();

    res.status(200).send({ message: "Update Evaluate By Id Succesful !" });

  } catch (error) {
    await t.rollback();
    error.controller = "updateEvaluateById";
    next(error);
  }
};
