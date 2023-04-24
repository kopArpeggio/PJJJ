const { Client } = require("@line/bot-sdk");
const { Student, sequelize } = require("../../models");

exports.test = async (req, res, next) => {
  const config = {
    channelAccessToken:
      "tF/NZHw+gSAUAPtym3hO3idNprv/TirMnwYv+n446D37MZDuJcpUQeUvULq5rnfPexqUlF6q39S/nKGDNgl57yr2pZ+Tpoz0tAecVdVmrvArxMroxCDhzoVi7u5FjEnpjLajZeO9WoL74vSVU2MnRwdB04t89/1O/w1cDnyilFU=",
  };
  const client = new Client(config);

  try {

    let stuId = req?.body?.queryResult?.parameters?.stuId?.toString();
    console.log(stuId);
    let userid =
      req?.body?.originalDetectIntentRequest?.payload?.data?.source?.userId;

    const student = await Student.findOne({ where: { stuNo: stuId } });

    const message = {
      type: "text",
      text: `ชื่อจริง:${student?.firstname} นามสกุล:${student?.lastname}`,
    };



    if (student?.documentStatus === "0") {
      message.text = "สำเร็จทุกขั้นตอนแล้ว";
    }
    if (student?.documentStatus === "1") {
      message.text = "Job Description ไม่ผ่าน";
    }
    if (student?.documentStatus === "2") {
      message.text = "Job Description รอการตอบรับจากสถานประกอบการ";
    }
    if (student?.documentStatus === "3") {
      message.text = "Job Description กำลังรออาจารย์ตรวจสอบ";
    }
    if (student?.documentStatus === "4") {
      message.text = "ยังไม่ส่ง Job Description";
    }
    if (student?.documentStatus === "5") {
      message.text = "รอการประเมินจากสถานประกอบการ";
    }
    if (student?.documentStatus === "6") {
      message.text = "รอการประเมินจากอาจารย์";
    }
    if (student?.documentStatus === "7") {
      message.text = "รอส่งเอกสาร";
    }
    if (student?.documentStatus === "8") {
      message.text = "กำลังตรวจสอบเอกสาร";
    }
    if (student?.documentStatus === "9") {
      message.text = "เอกสารไม่ผ่าน";
    }

    if (!student) {
      console.log("Don't have any Student");
      message.text = "รหัสนักศึกษาของคุณไม่มีในระบบกรุณากรอกใหม่";
    }

    await client.pushMessage(userid, message);

    res.status(200).send({ message: "req" });
  } catch (error) {
    error.controller = "test line bot";
    next(error);
  }
};
