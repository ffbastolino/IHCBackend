const mongoose = require('mongoose');
const { AlimentoSchema } = require('./Alimento');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  minhaLista: {
    type: [AlimentoSchema],
    required: false,
  },
});

mongoose.model('Usuario', UsuarioSchema);