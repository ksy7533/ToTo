module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        end_date: {
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
        timestamps: true
    });
};