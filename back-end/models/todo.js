module.exports = (sequelize, DataTypes) => {
  return sequelize.define('todo', {
      title: {
          type: DataTypes.STRING(100),
          allowNull: false,
      },

      content: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      priority: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  }, {
      timestamps: true
  });
};