const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ensureAuth } = require('./middlewares');

const expiresIn = 1 * 24 * 3600; // 토큰의 유효기간 = 1일

/*
 * 유저정보 가져오기
 */
router.get('/', ensureAuth(), async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    return res.status(200).json({
      result: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
      return res.status(400).json({
        message : '해당 이메일이 존재합니다',
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
      let message = info ? info.message : '로그인이 실패하였습니다';
      return res.status(400).json({
        message,
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