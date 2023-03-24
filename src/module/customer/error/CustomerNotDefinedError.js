module.exports = class CustomerNotDefinedError extends Error {
  constructor() {
    super('Customer not defined');
  }
};
