const mongoose = require('mongoose');


const WishedWineSchema = new mongoose.Schema({
  wineId: {
    type: String,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
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
  winery: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  insertionDate: {
    type: Number,
    required: true,
  },
});

mongoose.model('WishedWine', WishedWineSchema);

module.exports.WishedWineSchema = WishedWineSchema;
