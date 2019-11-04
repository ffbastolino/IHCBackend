const mongoose = require('mongoose');
const W2MError = require('../error/W2MError');

const UPDATEWINEBYID_ERROR = 'updateWineById validation error';

const validateCreateRequest = (wine) => {
  const errors = [];
  if (!wine.name) {
    errors.push('wine name is required');
  }
  if (!wine.year) {
    errors.push('wine year is required');
  }
  if (!wine.country) {
    errors.push('wine country is required');
  }
  if (!wine.suggestedPrice) {
    errors.push('wine price is required');
  }
  if (!wine.grapes) {
    errors.push('wine grape are required');
  }
  if (!wine.winery) {
    errors.push('wine winery is required');
  }
  return errors;
};

const validateUpdateRequest = (updateOptions) => {
  const { wineId, update } = updateOptions;
  if (!wineId) throw new W2MError(UPDATEWINEBYID_ERROR, 'wine id must be informed', 400);
  if (!update) throw new W2MError(UPDATEWINEBYID_ERROR, 'update fields must be informed', 400);
  if (!mongoose.Types.ObjectId.isValid(wineId)) throw new W2MError(UPDATEWINEBYID_ERROR, 'invalid id');
};

module.exports.validateCreateRequest = validateCreateRequest;
module.exports.validateUpdateRequest = validateUpdateRequest;
