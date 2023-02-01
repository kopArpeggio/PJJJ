const db = require("../../models");

const { Student, Teacher, Workplace } = require("../../models");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../middleware/utils");
const jwt = require("jsonwebtoken");

exports.test = async (req, res, next) => {
  try {
    res
      .status(200)
      .send({
        message: "connect to controller and Route Succesful!",
        data: req,
      });
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    var user;
    user = await Student.findOne({ where: { stuNo: username } });

    if (!user) {
      user = await Teacher.findOne({ where: { username } });
    }

    if (!user) {
      user = await Workplace.findOne({ where: { username } });
    }

    if (!user) {
      const error = new Error("User Not Found.");
      error.statusCode = 400;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const error = new Error("Wrong Password");
      error.statusCode = 400;
      throw error;
    }

    const token = createToken(user.id);

    const { exp } = jwt.decode(token);

    res.status(200).json({
      accessToken: token,
      expiredIn: exp,
      tokenType: "Bearer",
    });
  } catch (error) {
    error.controller = "login";
    next(error);
  }
};
