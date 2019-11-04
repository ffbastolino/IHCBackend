const mongoose = require('mongoose');
const W2MError = require('../error/W2MError');

const validateWishedWineRequest = (wishedWineId) => {
  if (!wishedWineId) throw new W2MError('getWishedWineById error', 'id must be informed', 400);
  if (!mongoose.Types.ObjectId.isValid(wishedWineId)) throw new W2MError('getWishedWineById error', 'invalid id', 422);
};

module.exports.validateWishedWineRequest = validateWishedWineRequest;
