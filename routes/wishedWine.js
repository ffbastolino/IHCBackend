const express = require('express');
const logger = require('../config/logger');

const {
  listAllWishedWines,
  listWishedWineById,
  listFeaturedWishedWines,
  listMyWishes,
  listMyPurchasesInProgress,
} = require('../controllers/wishedWineController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10);
    const response = await listAllWishedWines(page);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listAllWishedWines:error: ', e.message);
    next(e);
  }
});

router.get('/id', async (req, res, next) => {
  try {
    const response = await listWishedWineById(req.query.id);

    res.status(200).send(response);
  } catch (e) {
    logger.error(`wishedWine:get:listWishedWineById:error:${e.message}:${e.customMessageObject}`);
    next(e);
  }
});

router.get('/featured', async (req, res, next) => {
  try {
    const response = await listFeaturedWishedWines();

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listFeaturedWishedWines:error: ', e.message);
    next(e);
  }
});

router.get('/myWishes', async (req, res, next) => {
  try {
    const response = await listMyWishes(req.query.userId);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listMyWishes:error: ', e.message);
    next(e);
  }
});

router.get('/myPurchasesInProgress', async (req, res, next) => {
  try {
    const response = await listMyPurchasesInProgress(req.query.userId);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listMyPurchasesInProgress:error: ', e.message);
    next(e);
  }
});


module.exports = router;
