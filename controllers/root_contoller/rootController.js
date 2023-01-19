const db = require("../../models");

exports.test = async (req, res, next) => {
  try {
    res
      .status(200)
      .send({ message: "connect to controller and Route Succesful!" });
  } catch (error) {
    error.controller = "test";
    next(error);
  }
};

exports.migrate = async (req, res, next) => {
  try {
    db.sequelize.sync().then(() => {
      res.status(200).send({ message: "Migrate Succesful" });
    });
  } catch (error) {
    error.controller = "migrate";
    next(error);
  }
};
