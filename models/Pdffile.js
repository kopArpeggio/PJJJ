module.exports = (sequelize, DataTypes) => {
  const Pdffile = sequelize.define(
    "Pdffile",
    {
      fcn1: {
        type: DataTypes.STRING,
      },
      fcn2: {
        type: DataTypes.STRING,
      },
      regis: {
        type: DataTypes.STRING,
      },
      pdfName4: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "pdffile",
      paranoid: true,
      timestamps: true,
      underscored: true,
    }
  );

  return Pdffile;
};
