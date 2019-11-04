const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  cep: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  main: {
    type: Boolean,
    require: true,
  },
});

module.exports.addressSchema = addressSchema;
