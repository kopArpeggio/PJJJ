const db = require("../../models");
const { Op } = require("sequelize");

const {
  Student,
  Teacher,
  Workplace,
  Admin,
  Branch,
  Faculty,
} = require("../../models");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../middleware/utils");
const jwt = require("jsonwebtoken");

exports.test = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "connect to controller and Route Succesful!",
      data: req.user,
    });
  } catch (error) {
    error.controller = "test";
    next(error);
  }
};

exports.migrate = async (req, res, next) => {
  try {
    db.sequelize.sync({ alter: true }).then(() => {
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
    user = await Student.findOne({
      where: { stuNo: username },
      include: [
        {
          model: Branch,
          where: { status: true },
          // attributes: [],
          include: [{ model: Faculty, where: { status: true } }],
        },

        // { include: [{ model: Work }] },
      ],
    });

    if (!user) {
      user = await Teacher.findOne({
        include: [
          {
            model: Branch,
            attributes: [],
            include: [{ model: Faculty, where: { status: true } }],
            where: { status: true },
          },
        ],
        where: { username },
      });
    }

    if (!user) {
      user = await Admin.findOne({ where: { username } });
    }

    if (!user) {
      user = await Workplace.findOne({
        where: { [Op.and]: [{ username }, { status: true }] },
      });
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

    

    const token = createToken(user.id, user.username, user.stuNo);

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
