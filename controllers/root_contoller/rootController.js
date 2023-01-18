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
