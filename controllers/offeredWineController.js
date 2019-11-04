const W2MError = require('../error/W2MError');

const {
  convertWineDBToJSON,
  convertDetailedAddressDBToJSON,
} = require('../util/wineUtilities');

const {
  findUsersAndOfferedWines,
  findFeaturedOfferedWines,
  findOfferById,
  findUserById,
} = require('../services/userService');

const {
  validateOfferedWineRequest,
} = require('../validators/offeredWineValidator');

const UNATTENDED = 1;
const IN_PROGRESS = 2;

const convertOfferDBtoCardJSON = (offerDB, offerUserName) => ({
  offerId: offerDB._id,
  wine: convertWineDBToJSON(offerDB),
  user: {
    name: offerUserName,
  },
  origin: offerDB.origin,
});

const convertedDetailedOfferDBtoCardJson = (detailedOfferDB,
  detailedOfferUserName, detailedOfferAddress, detailedOfferUserGrade) => ({
  offerId: detailedOfferDB._id,
  wine: convertWineDBToJSON(detailedOfferDB),
  user: {
    name: detailedOfferUserName,
    address: convertDetailedAddressDBToJSON(detailedOfferAddress),
    grade: detailedOfferUserGrade,
  },
  origin: detailedOfferDB.origin,
});

const listAllOfferedWines = async (numberPage) => {
  const offers = await findUsersAndOfferedWines(numberPage);
  if (!offers.length) throw new W2MError('listAllOfferedWines:error', 'No sales found', 404);
  return offers.map((offer) => convertOfferDBtoCardJSON(offer.offeredWines, offer.name));
};

const listOfferById = async (id) => {
  validateOfferedWineRequest(id);
  const offers = await findOfferById(id);
  if (offers.length) {
    return offers.map((offer) => convertedDetailedOfferDBtoCardJson(offer.offeredWines,
      offer.name, offer.addresses, offer.grade));
  }
  throw new W2MError('listOfferById:error', 'Wine not found', 404);
};

const listFeaturedOfferedWines = async () => {
  const offers = await findFeaturedOfferedWines();
  return offers.map((offer) => convertOfferDBtoCardJSON(offer.offeredWines, offer.name));
};

const listMyOffers = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new W2MError('listMyOffers:error', 'UserId not found', 404);
  const offers = [];
  user.offeredWines.map((offer) => {
    if (offer.status === UNATTENDED) {
      return offers.push(offer);
    }
    return '';
  });
  if (!offers.length) throw new W2MError('listMyOffers:error', 'No offer found', 404);
  return offers.map((offer) => convertWineDBToJSON(offer));
};

const listMySalesInProgress = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new W2MError('listMySalesInProgress:error', 'UserId not found', 404);
  const offers = [];
  user.offeredWines.map((offer) => {
    if (offer.status === IN_PROGRESS) {
      return offers.push(offer);
    }
    return '';
  });
  if (!offers.length) throw new W2MError('listMySalesInProgress:error', 'No sales found', 404);
  return offers.map((offer) => convertWineDBToJSON(offer));
};

module.exports.listAllOfferedWines = listAllOfferedWines;
module.exports.listOfferById = listOfferById;
module.exports.listFeaturedOfferedWines = listFeaturedOfferedWines;
module.exports.convertOfferDBtoCardJSON = convertOfferDBtoCardJSON;
module.exports.convertedDetailedOfferDBtoCardJson = convertedDetailedOfferDBtoCardJson;
module.exports.listMyOffers = listMyOffers;
module.exports.listMySalesInProgress = listMySalesInProgress;
