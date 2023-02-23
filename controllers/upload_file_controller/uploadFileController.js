
const uuidv4 = require("uuid");

exports.uploadFileImage = async (req, res, next) => {
  try {
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) {
      const error = new Error("Doesn't have a file");
      error.statusCode = 400;
      throw error;
    }

    // If does not have image mime type prevent from uploading
    // if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

    const ext = image.name.split(".");
    let filename = "";

    // Generate new filename
    filename = `${uuidv4.v4()}.${ext[1]}`;
    if (
      ext[1] == "jpg" ||
      ext[1] == "pdf" ||
      ext[1] == "jpeg" ||
      ext[1] == "png"
    ) {
      if (ext[1] == "jpg" || ext[1] == "jpeg" || ext[1] == "png") {
        image.mv(`${__dirname}/../../assets/image/${filename}`);
      }
      if (ext[1] == "pdf") {
        image.mv(`${__dirname}/../../assets/pdf/${filename}`);
      }
      res.sendStatus(200);
    }

    res.status(400).send({ message: "Your File Should be JPG or PDF ONLY" });

    // Move the uploaded image to our upload folder
  } catch (error) {
    next(error);
  }
};

