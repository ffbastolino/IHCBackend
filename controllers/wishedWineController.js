const W2MError = require('../error/W2MError');

const {
  findUsersAndWishedWines,
  findFeaturedWishedWines,
  findWishById,
  findUserById,
} = require('../services/userService');

const {
  convertWineDBToJSON,
  convertDetailedAddressDBToJSON,
} = require('../util/wineUtilities');

const {
  validateWishedWineRequest,
} = require('../validators/wishedWineValidator');

const UNATTENDED = 1;
const IN_PROGRESS = 2;

const convertedDetailedWishDBtoCardJson = (detailedWishDB,
  detailedWishUserName, detailedWishAddresses, detailedWishUserGrade) => ({
  wishId: detailedWishDB._id,
  wine: convertWineDBToJSON(detailedWishDB),
  user: {
    name: detailedWishUserName,
    address: convertDetailedAddressDBToJSON(detailedWishAddresses),
    grade: detailedWishUserGrade,
  },
});

const convertedWishedDBtoCardJSON = (wishedDB, wishedUserName) => ({
  wishId: wishedDB._id,
  wine: convertWineDBToJSON(wishedDB),
  user: {
    name: wishedUserName,
  },
});

const listAllWishedWines = async (numberPage) => {
  const wines = await findUsersAndWishedWines(numberPage);
  if (!wines.length) throw new W2MError('listAllWishedWines:error', 'No wish found', 404);
  return wines.map((wine) => convertedWishedDBtoCardJSON(wine.wishedWines, wine.name));
};

const listWishedWineById = async (id) => {
  validateWishedWineRequest(id);

  const wishes = await findWishById(id);
  if (!wishes.length) throw new W2MError('listWishedWineById:error', 'Wine not found', 404);

  return wishes.map((wish) => convertedDetailedWishDBtoCardJson(wish.wishedWines,
    wish.name, wish.addresses, wish.grade));
};

const listFeaturedWishedWines = async () => {
  const wisheds = await findFeaturedWishedWines();
  return wisheds.map((wished) => convertedWishedDBtoCardJSON(wished.wishedWines, wished.name));
};

const listMyWishes = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new W2MError('listMyWishes:error', 'UserId not found', 404);
  const wishes = [];
  user.wishedWines.map((wish) => {
    if (wish.status === UNATTENDED) {
      return wishes.push(wish);
    }
    return '';
  });
  if (!wishes.length) throw new W2MError('listMyWishes:error', 'No wish found', 404);
  return wishes.map((wish) => convertWineDBToJSON(wish));
};

const listMyPurchasesInProgress = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new W2MError('listMyPurchasesInProgress:error', 'UserId not found', 404);
  const wishes = [];
  user.wishedWines.map((wish) => {
    if (wish.status === IN_PROGRESS) {
      return wishes.push(wish);
    }
    return '';
  });
  if (!wishes.length) throw new W2MError('listMyPurchasesInProgress:error', 'No purchase found', 404);
  return wishes.map((wish) => convertWineDBToJSON(wish));
};

module.exports.listAllWishedWines = listAllWishedWines;
module.exports.listWishedWineById = listWishedWineById;
module.exports.listFeaturedWishedWines = listFeaturedWishedWines;
module.exports.convertedDetailedWishDBtoCardJson = convertedDetailedWishDBtoCardJson;
module.exports.convertedWishedDBtoCardJSON = convertedWishedDBtoCardJSON;
module.exports.listMyWishes = listMyWishes;
module.exports.listMyPurchasesInProgress = listMyPurchasesInProgress;
