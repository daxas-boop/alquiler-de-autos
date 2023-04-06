module.exports = class CustomerIdNotDefinedError extends Error {
  constructor() {
    super('Customer ID not defined');
  }
};
