const mongoose = require('mongoose');

const moment = require('moment');

const getRandonNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const convertToJSON = (offer) => ({
  _id: new mongoose.Types.ObjectId(),
  wineId: offer._id,
  status: getRandonNumber(2, 1),
  name: offer.name,
  year: offer.year,
  country: offer.country,
  region: offer.region,
  suggestedPrice: offer.suggestedPrice,
  winery: offer.winery,
  imgUrl: offer.imgUrl,
  type: offer.type,
  origin: 1,
  insertionDate: moment().utc().valueOf(),
});

module.exports = {
  async up(db) {
    const wines = db.collection('wines');
    const offeredWines = await wines.find({}, { grapes: 0 }).sort({ _id: -1 }).limit(7);

    offeredWines.toArray((err, offers) => {
      const offeredWine = offers.map((offer) => convertToJSON(offer));
      return db.collection('users').update({ name: 'Felipe Fernandes Bastos' }, {
        $set: {
          offeredWines: offeredWine,
        },
      });
    });
  },

  down(db) {
    return db.collection('users').update({ name: 'Felipe Fernandes Bastos' }, {
      $set: {
        offeredWines: [],
      },
    });
  },
};
