const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

/*
 * 회원가입 하기
 */
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({
            where: {email}
        })
        if(exUser){
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        })
        return res.redirect('/login');
    } catch(error){
        console.error(error);
        next(error);
    }
});

/*
 * 로그인 하기 - local 전략
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError)
        }
        if(!user) {
            return res.status(401).json({
                error : info.message
            });
        }
        return req.login(user, (loginError) => { //여기서 req.login함수를 실행하면서 session user정보를 넣고 그후 serializeUser실행
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send(200);
        });
    })(req, res, next);
});

/*
 * 로그아웃하기
 */
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;