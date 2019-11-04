const mongoose = require('mongoose');
const { addressSchema } = require('./Address.js');
const { WishedWineSchema } = require('./WishedWine.js');
const { OfferedWineSchema } = require('./OfferedWine');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addresses: {
    type: [addressSchema],
    required: false,
  },
  grade: {
    type: Number,
    required: true,
  },
  wishedWines: {
    type: [WishedWineSchema],
    required: false,
  },
  offeredWines: {
    type: [OfferedWineSchema],
    required: false,
  },
});

mongoose.model('User', UserSchema);
