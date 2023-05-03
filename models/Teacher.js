const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "teacher",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Teacher.beforeBulkCreate((teachers) => {
    teachers.forEach((teacher) => {
      const salt = bcrypt.genSaltSync(10);
      teacher.password = bcrypt.hashSync(teacher?.username?.toString(), salt);
    });
  });

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.Branch, {
      foreignKey: "branchId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Teacher.hasMany(models.Student, {
      foriegnKey: "teacherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Teacher.hasMany(models.Student, {
      foreignKey: "advisorTeacherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Teacher;
};
