const LocalStorage = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

/*
 * 로컬 전략 - db의 email, password을 이용하여 로그인 가능여부 확인하기
 */
module.exports = (passport) => {
    passport.use(new LocalStorage({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => { //done(에러, 성공, 실패)
        try{
            const exUser = await User.find({ where: { email }});
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}