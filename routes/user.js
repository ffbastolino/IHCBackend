const express = require('express');
const logger = require('../config/logger');

const router = express.Router();

const {
  addNewAddress,
  listUserByName,
} = require('../controllers/userController');

router.post('/newAddress', async (req, res, next) => {
  try {
    const response = await addNewAddress(req.body);

    res.send(response).status(201);
  } catch (e) {
    logger.error('wine:post:addNewAddress:error: ', e.message);
    next(e);
  }
});

router.get('/searchName', async (req, res, next) => {
  try {
    const response = await listUserByName(req.query.name);

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listUserByName:error: ', e.message);
    next(e);
  }
});

module.exports = router;
