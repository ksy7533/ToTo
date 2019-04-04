const express = require('express');
const router = express.Router();
const { Sequelize, Project, Todo, Problem, Concern} = require('../models');
const { ensureAuth } = require('./middlewares');
const Moment = require('moment');

/*
 * 해당하는 기간의 모든 업무 리스트 목록 가져오기
 */
router.post('/:pid/calendar', ensureAuth(), async (req, res, next) => {
  try {
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

/*
 * 미완료중인 모든 업무 리스트 목록 가져오기
 */
router.get('/:pid/incomplete', ensureAuth(), async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      where: {
        projectId: req.params.pid,
        completed: false,
      },
      raw: true,
    });
    todos.map(item => item.type='todo');

    const problems = await Problem.findAll({
      where: {
        projectId: req.params.pid,
        completed: false,
      },
      raw: true,
    });
    problems.map(item => item.type='problem');

    const concerns = await Concern.findAll({
      where: {
        projectId: req.params.pid,
        completed: false,
      },
      raw: true,
    });
    concerns.map(item => item.type='concern');

    const works = todos.concat(problems, concerns);
    const result = works.sort((a,b) => new Moment(a.regDate).format('YYYYMMDD') - new Moment(b.regDate).format('YYYYMMDD'));
    return res.status(200).json({result});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
