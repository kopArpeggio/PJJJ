module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      houseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amphoe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longtitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "address",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Address.associate = (models) => {
    Address.hasOne(models.Workplace, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Address.hasOne(models.Work, {
      foreignKey: "studentAddressId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Address;
};
