module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define(
    "Branch",
    {
      branchName: {
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
      tableName: "branch",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Branch.associate = (models) => {
    Branch.belongsTo(models.Faculty, {
      foreignKey: "facultyId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Branch;
};
