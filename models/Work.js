module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define(
    "Work",
    {
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      benefit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bossFirstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bossLastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bossPosition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bossDepartment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsFirstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsLastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsDepartment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactorsEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactStatus: {
        type: DataTypes.ENUM("1", "2", "3"),
        allowNull: false,
      },
      workingStatus: {
        type: DataTypes.ENUM("1", "2", "3"),
        allowNull: false,
        defaultValue: "1",
      },
      startAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
