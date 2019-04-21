const express = require('express');
const router = express.Router();
const { Sequelize, Project, Todo, Problem, Concern} = require('../models');
const { ensureAuth } = require('./middlewares');
const Moment = require('moment');

/*
 * 업무 검색하기
 */
router.get('/search', ensureAuth(), async (req, res, next) => {
  const keyword = req.query.keyword;
  try {
    const todos = await Todo.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: '%' + keyword + '%',
        }
      },
      raw: true,
    });
    todos.map(item => item.type='todo');

    const problems = await Problem.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: '%' + keyword + '%',
        }
      },
      raw: true,
    });
    problems.map(item => item.type='problem');

    const concerns = await Concern.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: '%' + keyword + '%',
        }
      },
      raw: true,
    });
    concerns.map(item => item.type='concern');

    const works = todos.concat(problems, concerns);
    console.log(works)
    return res.status(200).json({
      result: works,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * 해당하는 기간의 모든 업무 리스트 목록 가져오기
 */
router.get('/:pid/calendar', ensureAuth(), async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.query.startDateOfMonth, req.query.endDateOfMonth],
        }
      },
      raw: true,
    });

    const problems = await Problem.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.query.startDateOfMonth, req.query.endDateOfMonth],
        }
      },
      raw: true,
    });

    const concerns = await Concern.findAll({
      where: {
        projectId: req.params.pid,
        regDate: {
          [Sequelize.Op.between]: [req.query.startDateOfMonth, req.query.endDateOfMonth],
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
