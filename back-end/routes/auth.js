const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const expiresIn = 1 * 24 * 3600; // 토큰의 유효기간 = 1일

/*
 * 회원가입 하기
 */
router.post('/join', async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({
            where: {email}
        });
        if(exUser){
            return res.status(401).json({
                error : '이미존재한다',
            });
        };
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({
            email,
            nick,
            password: hash,
        });
        return res.status(201).json({
            user
        });
    } catch(error){
        console.error(error);
        next(error);
    }
});

/*
 * 로그인 하기 - local 전략 
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            let message = info ? info.message : 'Login failed';
            return res.status(401).json({
                error: message,
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const accessToken = jwt.sign({ id : user.id }, process.env.JWT_SECRET, { expiresIn });
            return res.json({user, accessToken});
        });
    })(req, res, next);
});

module.exports = router;