module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define(
    "Faculty",
    {
      facultyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      underscored: true,
      tableName: "faculty",
    }
  );

  return Faculty;
};
