module.exports = class CarNotFoundError extends Error {
  constructor() {
    super('Car not found');
  }
};
