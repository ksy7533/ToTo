const express = require('express');
const router = express.Router();
const {Project, Todo, Problem, Concern} = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * 해당하는 월의 모든 할일, 문제점, 고민사하 가져오기
 */
router.get('/:pid', ensureAuth(), async (req, res, next) => {
  try {
    console.log("dd")
    console.log(req.params.pid)
    console.log(req)
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

module.exports = router;