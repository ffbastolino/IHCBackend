const mongoose = require('mongoose');
require('../models/Wine');

const Wine = mongoose.model('Wine');

const PAGELIMIT = 10;

const findAllWines = (numberPage) => Wine.find().skip(PAGELIMIT * numberPage).limit(PAGELIMIT);

const createWine = (wine) => Wine.create(wine);

const updateWine = (wineId, update) => Wine.findByIdAndUpdate(wineId, update, {
  new: true,
});

const findWineByName = (searchName, numberPage) => Wine.find({
  name: { $regex: new RegExp(searchName), $options: 'i' },
}).skip(numberPage * PAGELIMIT).limit(PAGELIMIT);

module.exports.findAllWines = findAllWines;
module.exports.createWine = createWine;
module.exports.updateWine = updateWine;
module.exports.findWineByName = findWineByName;
