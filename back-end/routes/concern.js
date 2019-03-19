const express = require('express');
const router = express.Router();
const { Concern } = require('../models');
const { ensureAuth } = require('./middlewares');

/*
 * concern 모든 리스트 목록 가져오기
 */
router.get('/project/:pid', ensureAuth(), async (req, res, next) => {
  try {
    const concern = await Concern.findAll({
      where: {
        projectId: req.params.pid,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    return res.status(200).json({
      result: concern,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
 * 해당하는 id의 concern 한개 가져오기
 */
router.get('/:id', ensureAuth(), async (req, res, next) => {
  try {
    const concern = await Concern.findOne({
      where: {
        id: req.params.id,
      }
    });
    return res.status(200).json({
      result: concern,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
* concern 추가하기
*/
router.post('/', ensureAuth(), async (req, res, next) => {
  try {
    const concern = await Concern.create({
      projectId: req.body.pid,
      title: req.body.title,
      situation: req.body.situation,
      solution: req.body.solution,
      completed: req.body.completed,
      completedDate: req.body.completedDate,
      userId: req.user.id,
    });
    return res.status(201).json({
      result: concern,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
* concern 수정하기
*/
router.put('/:id', ensureAuth(), async (req, res, next) => {
  const {id} = req.params;
  let body = req.body;
  try {
    if (!id) return res.status(400);
    const concern = await Concern.findOne({
      where: { id }
    });
    if (!concern) return res.status(404);
    Object.keys(body).forEach(key => {
      let value = body[key];
      if (typeof value === 'string') value = value.trim();
      concern[key] = value;
    });
    await concern.save();
    res.status(201).json({ result: concern });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
* concern 삭제하기
*/
router.delete('/:id', ensureAuth(), async (req, res, next) => {
  try {
    await Concern.destroy({
      where: {
        id: req.params.id,
        projectId: req.body.pid,
      }
    });
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;