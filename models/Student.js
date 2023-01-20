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

  Student.associate = (models) => {
    Student.belongsTo(models.Address, {
        foreignKey: "oldAddressId",
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
    });
    Student.belongsTo(models.Address, {
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
