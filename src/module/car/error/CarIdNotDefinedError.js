module.exports = class CarIdNotDefinedError extends Error {
  constructor() {
    super('Car ID not defined');
  }
};
