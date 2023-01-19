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
        type: DataTypes.INTEGER,
        allowNull: false,
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
    Address.hasOne(models.Student, {
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Address.hasOne(models.Workplace, {
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Address;
};
