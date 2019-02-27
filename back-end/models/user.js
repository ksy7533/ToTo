module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },

        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(100),
            allowNull: true, // 카카오 로그인 했을 경우 비밀번호 입력안함
        },

        provider: {
            // 무엇으로 로그인 했는가, ex) 카카오, 페이스북..
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        
        snsId: {
            type: DataTypes.STRING(30), // 카카오로 로그인 했을 경우에만 카카오 아이디를 갖는다
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true, // 삭제일 기록 (복구용)
    });
};