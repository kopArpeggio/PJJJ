module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define(
    "Work",
    {
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jobDetail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      benefit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bossFirstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bossLastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bossPosition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bossDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactorsFirstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsLastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactorsDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactorsPosition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactorsPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactorsEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactStatus: {
        type: DataTypes.ENUM("1", "2", "3"),
        defaultValue: "1",
        allowNull: true,
      },
      workingStatus: {
        type: DataTypes.ENUM("1", "2", "3"),
        allowNull: true,
        defaultValue: "1",
      },
      startAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      tableName: "work",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  Work.associate = (models) => {
    Work.hasOne(models.Student, {
      foreignKey: "workId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Work.belongsTo(models.Workplace, {
      foreignKey: "WorkplaceId",
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Work;
};
