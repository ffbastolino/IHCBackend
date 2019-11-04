const mongoose = require('mongoose');
const W2MError = require('../error/W2MError');

const validateOfferedWineRequest = (offeredWineId) => {
  if (!offeredWineId) throw new W2MError('getOfferById:error', 'id must be informed', 400);
  if (!mongoose.Types.ObjectId.isValid(offeredWineId)) throw new W2MError('getOfferById:error', 'invalid id', 400);
};

module.exports.validateOfferedWineRequest = validateOfferedWineRequest;
