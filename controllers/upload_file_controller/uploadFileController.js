const path = require("path");
const uuidv4 = require("uuid");

exports.uploadFileImage = async (req, res, next) => {
  try {
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

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
      image.mv(`${__dirname}/../../assets/pdf/${filename}`);
      res.sendStatus(200);
    }

    return res
      .status(400)
      .send({ message: "Your File Should be JPG or PDF ONLY" });
    // Move the uploaded image to our upload folder
  } catch (error) {
    next(error);
  }
};

exports.getFileImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, "../../assets/pdf/", filename);
    res.sendFile(imagePath);
  } catch (error) {
    next(error);
  }
};
