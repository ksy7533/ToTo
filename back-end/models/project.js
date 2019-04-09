module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        content: {
            type: DataTypes.TEXT('medium'),
            allowNull: true,
        },

        support: {
            type: DataTypes.TEXT('medium'),
            allowNull: true,
        }
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
};