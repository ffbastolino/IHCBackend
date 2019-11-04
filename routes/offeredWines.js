const express = require('express');
const logger = require('../config/logger');

const {
  listAllOfferedWines,
  listOfferById,
  listFeaturedOfferedWines,
  listMyOffers,
  listMySalesInProgress,
} = require('../controllers/offeredWineController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10);
    const response = await listAllOfferedWines(page);

    res.status(200).send(response);
  } catch (e) {
    logger.error('offeredWine:get:listAllOfferedWines:error: ', e.message);

    next(e);
  }
});

router.get('/id', async (req, res, next) => {
  try {
    const response = await listOfferById(req.query.id);

    res.status(200).send(response);
  } catch (e) {
    logger.error(`offeredWine:get:listOfferById:error:${e.message}:${e.customMessageObject}`);
    next(e);
  }
});

router.get('/featured', async (req, res, next) => {
  try {
    const response = await listFeaturedOfferedWines();
    res.status(200).send(response);
  } catch (e) {
    logger.error('offeredWine:get:listFeaturedOfferedWines:error: ', e.message);

    next(e);
  }
});

router.get('/myOffers', async (req, res, next) => {
  try {
    const response = await listMyOffers(req.query.userId);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listMyOffers:error: ', e.message);
    next(e);
  }
});

router.get('/mySalesInProgress', async (req, res, next) => {
  try {
    const response = await listMySalesInProgress(req.query.userId);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listMySalesInProgress:error: ', e.message);
    next(e);
  }
});


module.exports = router;
