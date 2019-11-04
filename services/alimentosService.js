const mongoose = require('mongoose');
require('../models/Alimentos');

const Alimentos = mongoose.model('Alimentos');

const encontraAlimentosPorGrupo = () => Alimentos.findOne(    
    );



module.exports.encontraAlimentosPorGrupo = encontraAlimentosPorGrupo;