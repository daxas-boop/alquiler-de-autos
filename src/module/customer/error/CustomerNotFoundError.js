module.exports = class CustomerNotFoundError extends Error {
  constructor() {
    super('Customer not found');
  }
};
