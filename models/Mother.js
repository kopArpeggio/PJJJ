module.exports = (sequelize, DataTypes) => {
  const Mother = sequelize.define(
    "Mother",
    {
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      job: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "mother",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Mother.associate = (models) => {
    Mother.hasOne(models.Student, {
      foreignKey: "motherId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Mother;
};
