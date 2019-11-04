const mongoose = require('mongoose');

const { AlimentoSchema } = require('./Alimento');

const AlimentosSchema = new mongoose.Schema({
        bebidas: {
        type: [AlimentoSchema],
        required: true,
      },
      cuidadosPessoais: {
        type: [AlimentoSchema],
        required: true,
      },
      cuidadosComRoupas: {
        type: [AlimentoSchema],
        required: true,
      },
      biscoitos: {
        type: [AlimentoSchema],
        required: true,
      },
      doces: {
        type: [AlimentoSchema],
        required: true,
      },
      massas: {
        type: [AlimentoSchema],
        required: true,
      },
      molhos: {
        type: [AlimentoSchema],
        required: true,
      },
      frutas: {
        type: [AlimentoSchema],
        required: true,
      },
      congelados: {
        type: [AlimentoSchema],
        required: true,
      },
});

mongoose.model('Alimentos', AlimentosSchema);


