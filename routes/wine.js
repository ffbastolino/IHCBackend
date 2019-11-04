const express = require('express');
const logger = require('../config/logger');

const {
  listAllWines,
  validateAndCreateWine,
  updateWineById,
  listWineByName,
} = require('../controllers/wineController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await listAllWines(req.query.page);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wine:get:listAllWines:error: ', e.message);
    next(e);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const response = await listWineByName(req.query.name, req.query.page);

    res.send(response).status(200);
  } catch (e) {
    logger.error('wine:get:listWineByName:error: ', e.message);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await validateAndCreateWine(req.body);

    res.status(201).send(response);
  } catch (e) {
    logger.error(`wine:post:createWine:error:${e.message}:${e.customMessageObject}`);
    next(e);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const response = await updateWineById(req.body);

    res.status(204).send({ updated: !!response });
  } catch (e) {
    logger.error(`wine:put:updateWineById:error:${e.message}:${e.customMessageObject}`);
    next(e);
  }
});

module.exports = router;
