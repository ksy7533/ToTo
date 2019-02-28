const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * todo 모든 리스트 목록 가져오기
 */
router.get('/project/:pid', ensureAuth(), async (req, res, next) => {
  try {
      const todo = await Todo.findAll({
          where: {
              projectId: req.params.pid,
          }
      });
      return res.status(200).json({
          result: todo,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
 * 해당하는 id의 todo 한개 가져오기
 */
router.get('/:id', ensureAuth(), async (req, res, next) => {
  try {
      const todo = await Todo.findOne({
          where: {
              id: req.params.id,
          }
      });
      return res.status(200).json({
          result: todo,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
* todo 추가하기
*/
router.post('/', ensureAuth(), async (req, res, next) => {
  try {
      const todo = await Todo.create({
          projectId: req.body.pid,
          title: req.body.title,
          content: req.body.content,
          progress: req.body.progress,
          priority: req.body.priority,
          completedDate: req.body.completedDate,
          userId: req.user.id,
      });
      return res.status(201).json({
        result: todo,
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

/*
* todo 삭제하기
*/
router.delete('/:id', ensureAuth(), async (req, res, next) => {
  try {
      await Todo.destroy({
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