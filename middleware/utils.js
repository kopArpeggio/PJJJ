const jwt = require("jsonwebtoken");

exports.createToken = (userId, username, stuNo) => {
  return jwt.sign(
    {
      id: userId,
      username: username,
      stuNo: stuNo,
    },
    process.env?.JWT_SECRET,
    { expiresIn: "7 days" }
  );
};
