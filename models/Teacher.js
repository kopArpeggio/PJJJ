module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faculty: {
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

  Teacher.associate = (models) => {
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
