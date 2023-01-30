module.exports = (sequelize, DataTypes) => {
  const Birth = sequelize.define(
    "Birth",
    {
      placeOfBirth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDay: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bloodTypes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: true,
      },
      height: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: true,
      },
      ethnicity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "birth",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Birth.associate = (models) => {
    Birth.hasOne(models.Student, {
      foreignKey: "birthId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Birth;
};
