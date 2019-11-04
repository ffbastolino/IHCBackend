const mongoose = require('mongoose');

const moment = require('moment');

const getRandonNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const convertToJSON = (wish) => ({
  _id: new mongoose.Types.ObjectId(),
  wineId: wish._id,
  status: getRandonNumber(2, 1),
  name: wish.name,
  year: wish.year,
  country: wish.country,
  region: wish.region,
  winery: wish.winery,
  imgUrl: wish.imgUrl,
  type: wish.type,
  insertionDate: moment().utc().valueOf(),
});

module.exports = {
  async up(db) {
    const wines = db.collection('wines');
    const wishedWines = await wines.find({}, { grapes: 0 }).sort({ _id: 1 }).limit(7);

    wishedWines.toArray((err, wishs) => {
      const wishedWine = wishs.map((wish) => convertToJSON(wish));
      return db.collection('users').update({ name: 'Vinicius de Borba' }, {
        $set: {
          wishedWines: wishedWine,
        },
      });
    });
  },

  down(db) {
    return db.collection('users').update({ name: 'Vinicius de Borba' }, {
      $set: {
        wishedWines: [],
      },
    });
  },
};
