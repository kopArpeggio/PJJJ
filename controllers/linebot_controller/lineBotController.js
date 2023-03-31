exports.test = async (req, res, next) => {
  try {
    console.log(req);

    res.status(200).send({ message: req });
  } catch (error) {
    error.controller = "test line bot";
    next(error);
  }
};
