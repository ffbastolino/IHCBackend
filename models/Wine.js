const mongoose = require('mongoose');


// TODO: vinicius.borba - definir schema conforme base de dados contratada
const WineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  country: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  suggestedPrice: {
    type: Number,
    required: true,
  },
  grapes: {
    type: [String],
    required: true,
  },
  winery: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: true,
  },
});

mongoose.model('Wine', WineSchema);

module.exports.WineSchema = WineSchema;
