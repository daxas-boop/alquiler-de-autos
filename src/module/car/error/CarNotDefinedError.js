module.exports = class CarNotDefinedError extends Error {
  constructor() {
    super('Car not defined');
  }
};
