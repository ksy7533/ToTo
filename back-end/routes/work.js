const express = require('express');
const router = express.Router();
const { Sequelize, Project, Todo, Problem, Concern} = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * 해당하는 기간의 모든 업무 리스트 목록 가져오기
 */
router.post('/:pid/calendar', ensureAuth(), async (req, res, next) => {
  try {
    console.log(req.params.pid)
    const todos = await Todo.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
        }
      },
      raw: true,
    });

    const problems = await Problem.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
        }
      },
      raw: true,
    });

    const concerns = await Concern.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
        }
      },
      raw: true,
    });

    return res.status(200).json({
      result: {
        todos,
        problems,
        concerns,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
