const Birth = require("./Birth");

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
      branch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearClass: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      gpa: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      advisor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activity: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "student",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  return Student;
};
