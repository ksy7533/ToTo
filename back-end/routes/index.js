const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
  console.log('in')
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

/* 서버에서 데이터 테스트 */
// router.get('/join', (req, res, next) => {
//     res.render('join');
// });

// router.get('/login', (req, res, next) => {
//     res.render('login');
// });

// router.get('/main', (req, res, next) => {
//     res.render('main', {
//         user: req.user,
//         loginError: req.flash('loginError')
//     });
// });

module.exports = router;