const path = require("path");
const uuidv4 = require("uuid");
const fs = require("fs");
const { Student, sequelize, Pdffile } = require("../../models");
const csv = require("csv-parser");
const stream = require("stream");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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
    if (student?.profilePic ) {
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

    if (student?.profileReg) {
      fs.unlink(
        `${__dirname}/../../assets/img/${student?.profileReg}`,
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

    const ext = path.extname(image?.name).toLowerCase();
    let filename = "";

    // Generate new filename
    filename = `${uuidv4.v4()}${ext}`;
    if (ext === ".jpg" || ext === ".pdf" || ext === ".jpeg" || ext === ".png") {
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        image.mv(`${__dirname}/../../assets/img/${filename}`);
      }
      if (ext == ".pdf") {
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

exports.uploadFileDocument = async (req, res, next) => {
  try {
    const files = req?.files;
    const { id } = req?.user?.student;
    // If no image submitted, exit
    if (!files) {
      const error = new Error("Doesn't have a file");
      error.statusCode = 400;
      throw error;
    }

    const student = await Student.findOne({
      where: { id },
      include: [
        {
          model: Pdffile,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.col("Pdffile.fcn1"), "fcn1"],
          [sequelize.col("Pdffile.fcn2"), "fcn2"],
          [sequelize.col("Pdffile.pdf_name4"), "pdfName4"],
        ],
        exclude: ["password", "updatedAt", "deletedAt", "createdAt"],
      },
    });
    console.log(student);
    if (student?.fcn1) {
      fs.unlink(`${__dirname}/../../assets/pdf/${student?.fcn1}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
    if (student?.fcn2) {
      fs.unlink(`${__dirname}/../../assets/pdf/${student?.fcn2}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
    if (student?.pdfName4) {
      fs.unlink(`${__dirname}/../../assets/pdf/${student?.pdfName4}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }

    const ext = path.extname(files?.fcn1?.name).toLowerCase();

    // Generate new filename
    const fcn1 = `${uuidv4.v4()}${ext}`;
    const fcn2 = `${uuidv4.v4()}${ext}`;
    const pdfName4 = `${uuidv4.v4()}${ext}`;

    if (ext === ".pdf") {
      if (ext == ".pdf") {
        files?.fcn1?.mv(`${__dirname}/../../assets/pdf/${fcn1}`);
        files?.fcn2?.mv(`${__dirname}/../../assets/pdf/${fcn2}`);
        files?.pdfName4?.mv(`${__dirname}/../../assets/pdf/${pdfName4}`);
      }
      res.status(200).send({
        message: "Upload File Succesful.",
        fcn1,
        fcn2,
        pdfName4,
      });
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

exports.uploadFileCsv = async (req, res, next) => {
  const { CSV } = req?.files;

  const bufferStream = new stream.PassThrough();
  bufferStream.end(CSV.data);
  const t = await sequelize.transaction();

  try {
    const users = [];
    const promises = [];

    bufferStream
      .pipe(csv())
      .on("data", (row) => {
        const user = {
          id: row?.id,
          firstname: row?.firstname,
          lastname: row?.lastname,
          stuNo: row?.stu_no,
          gpa: row?.gpa,
          phoneNumber: row?.phone_number.replace(/'/g, ""),
          email: row?.email,
          idCardNumber: row?.id_card_number.replace(/'/g, ""),
        };

        const passwordPromise = bcrypt
          .hash(row?.stu_no, 10)
          .then((hashedPassword) => {
            user.password = hashedPassword;
          });
        promises.push(passwordPromise);

        users.push(user);
      })
      .on("end", async () => {
        await Promise.all(promises);
        await Student.bulkCreate(users, {
          updateOnDuplicate: [
            "firstname",
            "lastname",
            "gpa",
            "phoneNumber",
            "email",
            "stuNo",
            "idCardNumber",
          ],
          transaction: t,
        });

        await t.commit();

        res.status(201).send({ message: "Create Students Successful." });
      });
  } catch (error) {
    await t.rollback();
    error.controller = "uploadFileCsv";
    next(error);
  }
};

const XLSX = require("xlsx");

exports.uploadFileLab = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { CSV } = req?.files;
    const workbook = XLSX.read(CSV.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    for (const val of data) {
      const duplicate = await Student.findOne(
        val?.id
          ? {
              where: {
                [Op.and]: [
                  { firstname: val?.firstname },
                  { lastname: val?.lastname },
                  { id: { [Op.ne]: val?.id } },
                ],
              },
            }
          : {
              where: {
                [Op.and]: [
                  { firstname: val?.firstname },
                  { lastname: val?.lastname },
                ],
              },
            }
      );
      if (duplicate) {
        const err = new Error("Some User is Duplicate");
        err.statusCode = 400;
        throw err;
      }
    }

    const body = data?.map((val) => ({
      ...val,
      id: val?.id,
      stuNo: val?.stu_no,
      phoneNumber: val?.phone_number,
      idCardNumber: val?.id_card_number,
      branchId: parseInt(val?.major?.split(":")[0].trim()),
    }));

    const createBody = body?.map(
      (val) => (
        delete val?.id_card_number,
        delete val?.phone_number,
        delete val?.stu_no,
        {
          ...val,
        }
      )
    );

    await Student.bulkCreate(createBody, {
      updateOnDuplicate: [
        "firstname",
        "lastname",
        "gpa",
        "phoneNumber",
        "email",
        "stuNo",
        "idCardNumber",
        "branchId",
      ],
      transaction: t,
    });

    await t.commit();

    res.status(200).send(createBody);
  } catch (error) {
    await t.rollback();
    error.controller = "uploadFileLab";
    next(error);
  }
};

exports.uploadFilexlsxTeacher = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { CSV } = req?.files;
    const workbook = XLSX.read(CSV.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    for (const val of data) {
      const duplicate = await Student.findOne(
        val?.id
          ? {
              where: {
                [Op.and]: [
                  { firstname: val?.firstname },
                  { lastname: val?.lastname },
                  { id: { [Op.ne]: val?.id } },
                ],
              },
            }
          : {
              where: {
                [Op.and]: [
                  { firstname: val?.firstname },
                  { lastname: val?.lastname },
                ],
              },
            }
      );
      if (duplicate) {
        const err = new Error("Some User is Duplicate");
        err.statusCode = 400;
        throw err;
      }
    }

    const body = data?.map((val) => ({
      ...val,
      id: val?.id,
      username: val?.username,

      branchId: parseInt(val?.major?.split(":")[0].trim()),
    }));

    const createBody = body?.map(
      (val) => (
        delete val?.id_card_number,
        delete val?.phone_number,
        delete val?.stu_no,
        {
          ...val,
        }
      )
    );

    await Student.bulkCreate(createBody, {
      updateOnDuplicate: [
        "firstname",
        "lastname",
        "email",
        "username",
        "branchId",
      ],
      transaction: t,
    });

    await t.commit();

    res.status(200).send(createBody);
  } catch (error) {
    await t.rollback();
    error.controller = "uploadFileLab";
    next(error);
  }
};
