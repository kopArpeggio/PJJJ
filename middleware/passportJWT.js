const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const {
  Student,
  Teacher,
  Workplace,
  Address,
  Father,
  Mother,
} = require("../models");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env?.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (req, res) => {
    try {
      const student = await Student.findOne(
        { include: [Address, Father, Mother] },
        {
          where: { id: req.id },
        }
      );
      if (student) {
        return res(null, {
          student,
          Role: "student",
        });
      }

      const teacher = await Teacher.findOne({ where: { id: req.id } });
      if (teacher) {
        return res(null, { teacher, Role: "teacher" });
      }

      const workplace = await Workplace.findOne({ where: { id: req.id } });
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
