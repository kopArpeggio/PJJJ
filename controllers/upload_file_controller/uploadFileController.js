const path = require("path");
const uuidv4 = require("uuid");
const fs = require("fs");
const { Student } = require("../../models");

exports.uploadFileImage = async (req, res, next) => {
  try {
    const { image } = req?.files;
    const { id } = req?.user?.student;
    // If no image submitted, exit
    if (!image) {
      const error = new Error("Doesn't have a file");
      error.statusCode = 400;
      throw error;
    }

    const student = await Student.findOne({ where: { id } });
    if (student?.profilePic) {
      fs.unlink(
        `${__dirname}/../../assets/img/${student?.profilePic}`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    }

    // If does not have image mime type prevent from uploading
    // if (!/^image/.test(image.mimetype)) return res.sendStatus(400)

    const ext = path.extname(image?.name);
    console.log(ext);
    let filename = "";

    // Generate new filename
    filename = `${uuidv4.v4()}${ext}`;
    if (
      ext === ".jpg" ||
      ext === ".pdf" ||
      ext === ".jpeg" ||
      ext === ".png" ||
      ext === ".PNG"
    ) {
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".PNG") {
        image.mv(`${__dirname}/../../assets/img/${filename}`);
      }
      if (ext == "pdf") {
        image.mv(`${__dirname}/../../assets/pdf/${filename}`);
      }
      res
        .status(200)
        .send({ message: "Upload File Succesful.", data: filename });
    } else {
      const error = new Error("Your File Type is a not supported to system");
      error.statusCode = "400";
      throw error;
    }

    // res.status(400).send({ message: "Your File Should be JPG or PDF ONLY" });

    // Move the uploaded image to our upload folder
  } catch (error) {
    error.controller = "uploadFileImage";
    next(error);
  }
};
