module.exports = (sequelize, DataTypes) => {
  const Father = sequelize.define(
    "Father",
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
      tableName: "father",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Father.associate = (models) => {
    Father.hasOne(models.Student, {
      foreignKey: "fatherId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };

  return Father;
};
