module.exports = (sequelize, DataTypes) => {
  const Workplace = sequelize.define(
    "Workplace",
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
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
      tableName: "workplace",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Workplace.associate = (models) => {
    Workplace.hasOne(models.Work, {
      foreignKey: "workplaceId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Workplace.belongsTo(models.Address, {
      foreignKey: "addressId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Workplace;
};
