module.exports = (sequelize, DataTypes) => {
  return sequelize.define('problem', {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      situation: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },

      cause: {
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

      completedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  }, {
      timestamps: true
  });
};