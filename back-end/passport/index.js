const local = require('./localStrategy');
const { User } = require('../models');

const user = {};

module.exports = (passport) => {
    passport.serializeUser((user, done) => { // 로그인할 때 한번 호출
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { // 매 요청시 마다 passport.session() 여기서 deserializeUser실행, user.id를 DB조회 후 req.user로
        // deserializeUser는 모든 요청에 실행되기 때문에 DB조회를 캐싱해서 효율적이게 만들어야한다
        console.log(user)
        if(user[id]){
            done(user[id]);
        } else{
            User.find({
                where: {id}
            })
            .then(user => {
                user[id] = user;
                done(null, user);
            })
            .catch(err => done(err));
        }
    });

    local(passport);
};