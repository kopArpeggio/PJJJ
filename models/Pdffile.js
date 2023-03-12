module.exports = (sequelize, DataTypes) => {
  const Pdffile = sequelize.define(
    "Pdffile",
    {
      pdfName1: {
        type: DataTypes.STRING,
      },
      pdfName2: {
        type: DataTypes.STRING,
      },
      pdfName3: {
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
