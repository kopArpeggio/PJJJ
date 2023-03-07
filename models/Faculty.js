module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define(
    "Faculty",
    {
      facultyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      praranoid: true,
      timestamps: true,
      underscored: true,
      tableName: "faculty",
    }
  );

  return Faculty;
};
