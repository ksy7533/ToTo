const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('./middlewares');
const {Project} = require('../models');

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        await Project.create({
            userId: req.user.id,
            title: req.body.title,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            content: req.body.content,
            support: req.body.support
        });
        res.send('OK');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
