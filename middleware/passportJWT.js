const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { Op } = require("sequelize");
const {
  Student,
  Teacher,
  Workplace,
  Address,
  Father,
  Mother,
  Birth,
} = require("../models");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env?.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (req, res) => {
    try {
      // console.log(req.body);
      const { stuNo, username, id } = req;

      if (stuNo) {
        const student = await Student.findOne({
          include: [Address, Father, Mother, Birth],
          where: { [Op.and]: [{ stuNo }, { id }] },
        });
        if (student) {
          return res(null, {
            student,
            Role: "student",
          });
        }
      }

      const teacher = await Teacher.findOne({
        where: { [Op.and]: [{ username }, { id }] },
      });
      if (teacher) {
        return res(null, { teacher, Role: "teacher" });
      }

      const workplace = await Workplace.findOne({
        where: { [Op.and]: [{ username }, { id }] },
      });
      if (workplace) {
        return res(null, { workplace, Role: "company" });
      }

      return res(new Error("User Not Found"), null);
    } catch (error) {
      res(error);
    }
  })
);

module.exports = {
  isLogin: passport.authenticate("jwt", { session: false }),
};
