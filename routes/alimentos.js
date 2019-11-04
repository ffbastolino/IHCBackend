const express = require('express');
const logger = require('../config/logger');

const {
  listaAlimentosPorGrupo,
  listaCuidadosPessoais,
  listaCuidadosComRoupas,
  listaBiscoitos,
  listaDoces,
  listaMassas,
  listaMolhos,
  listaFrutas,
  listaCongelados,

} = require('../controllers/alimentosController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if(req.query.grupo === "bebidas"){
    var response = await listaAlimentosPorGrupo();
  }
    else if(req.query.grupo === "pessoais"){
      var response = await listaCuidadosPessoais();
  }
    else if(req.query.grupo ==="roupas"){
      var response = await listaCuidadosComRoupas();
  }
    else if(req.query.grupo === "biscoitos"){
      var response = await listaBiscoitos();
  }
    else if(req.query.grupo === "doces"){
      var response = await listaDoces();
  }
    else if(req.query.grupo === "massas"){
    var response = await listaMassas();
  }
    else if(req.query.grupo === "molhos"){
    var response = await listaMolhos();
  }
    else if(req.query.grupo === "frutas"){
    var response = await listaFrutas();
  }
    else if(req.query.grupo === "congelados"){
    var response = await listaCongelados();
  }

    res.status(200).send(response);
  } catch (e) {
    logger.error('wishedWine:get:listaAlimentos:error: ', e.message);
    next(e);
  }
});



module.exports = router;
