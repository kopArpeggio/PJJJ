const { sequelize, Work } = require("../../models");

exports.test = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "connect to controller and Route Succesful!",
      data: "HAHA",
    });
  } catch (error) {
    error.controller = "test";
    next(error);
  }
};

exports.updateWorkById = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { id } = req.params;
  const { work, finalAddress } = req.body;
  try {
    const updateBody = {
      ...work,
    };

    updateBody.workplaceId = finalAddress?.id;

    await Work.update(
      {
        ...work,
        workplaceId: finalAddress?.id,
      },
      {
        where: { id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send({ message: "Update Work By Id Succesful." });
  } catch (error) {
    await t.rollback();
    error.controller = "updateWorkById";
    next(error);
  }
};
