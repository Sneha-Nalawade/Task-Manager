class CustomAPIError extends Error{ //Error -> a js class
  constructor(message, statusCode) {
    super(message);
    this.statusCode=statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
}

module.exports = {createCustomError, CustomAPIError};