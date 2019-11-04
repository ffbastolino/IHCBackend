class W2MError extends Error {
  constructor(message, customMessageObject, status) {
    super(message);
    this.name = this.constructor.name;
    this.customMessageObject = customMessageObject;
    this.status = status;
  }
}

module.exports = W2MError;
