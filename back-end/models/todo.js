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

      /**
       * progress / 진행여부
       * 1 : 준비
       * 2 : 진행중
       * 3 : 완료
       */
      progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },

      /**
       * priority / 우선순위
       * 1 : 1순위
       * 2 : 2순위
       * 3 : 3순위
       */
      priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
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