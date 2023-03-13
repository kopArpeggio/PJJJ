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
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
        type: DataTypes.ENUM("1", "2", "3","4"),
        defaultValue: "4",
      },
      profilePic: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    Student.belongsTo(models.Pdffile, {
      foreignKey: "pdfFileId",
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
