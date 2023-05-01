module.exports = (sequelize, DataTypes) => {
  const Evaluate = sequelize.define(
    "Evaluate",
    {
      fcn12Point: {
        type: DataTypes.INTEGER,
      },
      fcn12Comment: {
        type: DataTypes.TEXT,
      },
      fcn13Point: {
        type: DataTypes.INTEGER,
      },
      fcn13Comment: {
        type: DataTypes.TEXT,
      },
      fcn14_1Point: {
        type: DataTypes.INTEGER,
      },
      fcn14_1Comment: {
        type: DataTypes.TEXT,
      },
      fcn14_2Point: {
        type: DataTypes.INTEGER,
      },
      fcn14_2Comment: {
        type: DataTypes.TEXT,
      },
      fcn15Point: {
        type: DataTypes.INTEGER,
      },
      fcn15Comment: {
        type: DataTypes.TEXT,
      },
      fcn9_2Point: {
        type: DataTypes.INTEGER,
      },
      fcn9_2Strength: {
        type: DataTypes.TEXT,
      },
      fcn9_2Improvement: {
        type: DataTypes.TEXT,
      },
      fcn10_1Point: {
        type: DataTypes.INTEGER,
      },
      fcn10_1Comment: {
        type: DataTypes.TEXT,
      },
      fcn10_2Point: {
        type: DataTypes.INTEGER,
      },
      fcn10_2Comment: {
        type: DataTypes.TEXT,
      },
      fcn11Point: {
        type: DataTypes.INTEGER,
      },
      fcn11Comment: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "evaluate",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Evaluate.associate = (models) => {
    Evaluate.hasOne(models.Student, {
      foreignKey: "evaluateId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };

  return Evaluate;
};
