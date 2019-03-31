const express = require('express');
const router = express.Router();
const { Sequelize, Project, Todo, Problem, Concern} = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * project 모든 리스트 목록 가져오기
 */
router.get('/', ensureAuth(), async (req, res, next) => {
  try {
    const project = await Project.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Todo,
        },
        {
          model: Problem,
        },
        {
          model: Concern,
        }
      ],
    });
    return res.status(200).json({
      result: project,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * 해당하는 기간의 모든 업무 리스트 목록 가져오기
 */
router.post('/:id/calendar', ensureAuth(), async (req, res, next) => {
  try {
    const project = await Project.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Todo,
          where: {
            regDate: {
              [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
            }
          },
        },
        {
          model: Problem,
          where: {
            regDate: {
              [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
            }
          },
        },
        {
          model: Concern,
          where: {
            regDate: {
              [Sequelize.Op.between]: [req.body.startDateOfMonth, req.body.endDateOfMonth],
            }
          },
        }
      ],
    });

    return res.status(200).json({
      result: project,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * 해당하는 id를 갖는 project 한개 가져오기
 */
router.get('/:id', ensureAuth(), async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Todo,
        },
        {
          model: Problem,
        },
        {
          model: Concern,
        }
      ],
    });
    return res.status(200).json({
      result: project,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * project 추가하기
 */
router.post('/', ensureAuth(), async (req, res, next) => {
  try {
    const project = await Project.create({
      userId: req.user.id,
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      content: req.body.content,
      support: req.body.support
    });
    return res.status(201).json({project});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * project 삭제하기
 */
router.delete('/:id', ensureAuth(), async (req, res, next) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
