const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stuNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearClass: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      year: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      gpa: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idCardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activity: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      documentStatus: {
        type: DataTypes.ENUM(
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11"
        ),
        defaultValue: "4",
      },
      profilePic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profileReg: {
        type: DataTypes.TEXT,
        allowNull:true
      },
      beneficiaryFirstname: {
        type: DataTypes.TEXT,
      },
      beneficiaryLastname: {
        type: DataTypes.TEXT,
      },
      beneficiaryPhoneNumber: {
        type: DataTypes.TEXT,
      },
      
    },
    {
      tableName: "student",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Student.beforeBulkCreate((students) => {
    students.forEach((student) => {
      const salt = bcrypt.genSaltSync(10);
      student.password = bcrypt.hashSync(student?.stuNo?.toString(), salt);
    });
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Pdffile, {
      foreignKey: "pdfFileId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Evaluate, {
      foreignKey: "evaluateId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Branch, {
      foreignKey: "branchId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Address, {
      as: "oldAddress",
      foreignKey: "oldAddressId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Address, {
      as: "newAddress",
      foreignKey: "newAddressId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Teacher, {
      foreignKey: "advisorTeacherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Father, {
      foreignKey: "fatherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Mother, {
      foreignKey: "motherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Birth, {
      foreignKey: "birthId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Work, {
      foreignKey: "workId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Student;
};
