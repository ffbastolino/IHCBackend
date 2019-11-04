const W2MError = require('../error/W2MError');

const {
  findAllWines,
  createWine,
  updateWine,
  findWineByName,
} = require('../services/wineService');

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require('../validators/wineValidator');

const {
  convertWineDBToJSON,
} = require('../util/wineUtilities');

const listAllWines = async (numberPage) => {
  const wines = await findAllWines(numberPage);
  return wines.map((wine) => convertWineDBToJSON(wine));
};

const validateAndCreateWine = async (wine) => {
  const errors = validateCreateRequest(wine);

  if (errors.length) {
    throw new W2MError('createWine validation failed', errors, 400);
  }

  const createdWine = await createWine(wine);

  return convertWineDBToJSON(createdWine);
};

const updateWineById = async (updateOptions) => {
  validateUpdateRequest(updateOptions);

  const updatedWine = await updateWine(updateOptions.wineId, updateOptions.update);

  if (!updatedWine) {
    throw new W2MError('updateWineById error', 'Wine not found', 404);
  }

  return convertWineDBToJSON(updatedWine);
};

const listWineByName = async (text, numberPage) => {
  const wines = await findWineByName(text, numberPage);
  if (!wines.length) throw new W2MError('listWishedWineById:error', 'Wine not found', 404);
  return wines.map((wine) => convertWineDBToJSON(wine));
};


module.exports.listAllWines = listAllWines;
module.exports.validateAndCreateWine = validateAndCreateWine;
module.exports.updateWineById = updateWineById;
module.exports.listWineByName = listWineByName;
