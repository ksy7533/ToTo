const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('./middlewares');
const {Project} = require('../models');

/*
 * project 모든 리스트 목록 가져오기
 */
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const project = await Project.findAll();
        return res.json({project});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/*
 * project 리스트 추가하기
 */
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const project = await Project.create({
            userId: req.user.id,
            title: req.body.title,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            content: req.body.content,
            support: req.body.support
        });
        return res.status(201).json({project});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
