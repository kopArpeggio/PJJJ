module.exports = (sequelize, DataTypes) => {
  const Mother = sequelize.define(
    "Mother",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
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
