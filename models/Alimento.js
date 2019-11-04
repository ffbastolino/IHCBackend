const mongoose = require('mongoose');

const AlimentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

mongoose.model('Alimento', AlimentoSchema);

module.exports.AlimentoSchema = AlimentoSchema;