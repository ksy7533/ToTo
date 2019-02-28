const express = require('express');
const router = express.Router();
const { Problem } = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * problem 모든 리스트 목록 가져오기
 */
router.get('/project/:pid', ensureAuth(), async (req, res, next) => {
  try {
      const problem = await Problem.findAll({
          where: {
              projectId: req.params.pid,
          }
      });
      return res.status(200).json({
          result: problem,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
 * 해당하는 id의 problem 한개 가져오기
 */
router.get('/:id', ensureAuth(), async (req, res, next) => {
  try {
      const problem = await Problem.findOne({
          where: {
              id: req.params.id,
          }
      });
      return res.status(200).json({
          result: problem,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
* problem 추가하기
*/
router.post('/', ensureAuth(), async (req, res, next) => {
  try {
      const problem = await Problem.create({
          projectId: req.body.pid,
          title: req.body.title,
          situation: req.body.situation,
          cause: req.body.cause,
          solution: req.body.solution,
          completed: req.body.completed,
          completedDate: req.body.completedDate,
          userId: req.user.id,
      });
      return res.status(201).json({
        result: problem,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
* problem 삭제하기
*/
router.delete('/:id', ensureAuth(), async (req, res, next) => {
  try {
      await Problem.destroy({
          where: {
            id: req.params.id,
            projectId: req.body.pid,
          }
      })
      return res.status(204).end();
  } catch (error) {
      console.error(error);
      next(error);
  }
});

module.exports = router;