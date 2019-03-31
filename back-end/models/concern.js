module.exports = (sequelize, DataTypes) => {
  return sequelize.define('concern', {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      situation: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },

      solution: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      regDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      },
  }, {
      timestamps: true
  });
};