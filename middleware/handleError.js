/* eslint-disable no-unused-vars */
const W2MError = require('../error/W2MError');

const handlW2MError = (err, req, res, next) => {
  if (err instanceof W2MError && err.message) {
    const error = {
      error: err.message,
      reasons: err.customMessageObject,
    };
    const errorStatus = err.status || 422;
    res.status(errorStatus).send(error);
  } else {
    res.status(500).send({ error: err.message || 'unknown.error' });
  }
};

module.exports.handlW2MError = handlW2MError;
