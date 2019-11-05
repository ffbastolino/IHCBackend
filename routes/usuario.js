const express = require('express');
const logger = require('../config/logger');

const router = express.Router();

const {
    listaMinhaLista,
    adicionaAlimento,
    removeAlimento,
} = require('../controllers/usuarioController');

router.get('/minhaLista', async (req, res, next) => {
    try {
      const response = await listaMinhaLista();
  
      res.status(200).send(response);
    } catch (e) {
      logger.error('wishedWine:get:listaAlimentos:error: ', e.message);
      next(e);
    }
  });

router.post('/adicionaAlimento', async (req, res, next) => {
    try {
      const response = await adicionaAlimento(req.body);
  
      res.send(response).status(201);
    } catch (e) {
      logger.error('wine:post:addNewAddress:error: ', e.message);
      next(e);
    }
  });

  router.delete('/removeAlimento', async (req, res, next) => {
    try {
      const response = await removeAlimento(req.body);
  
      res.send(response).status(201);
    } catch (e) {
      logger.error('wine:post:addNewAddress:error: ', e.message);
      next(e);
    }
  });

  module.exports = router;