const express = require('express');
const router = express.Router();

router.get('/join', (req, res, next) => {
    res.render('join');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/main', (req, res, next) => {
    res.render('main', {
        user: req.user,
        loginError: req.flash('loginError')
    });
});

module.exports = router;