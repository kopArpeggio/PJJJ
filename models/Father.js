module.exports = (sequelize, DataTypes) => {
  const Father = sequelize.define(
    "Father",
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
      tableName: "father",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Father.associate = (models) => {
    Father.hasOne(models.Student, {
      foreignKey: "fatherId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Father;
};
