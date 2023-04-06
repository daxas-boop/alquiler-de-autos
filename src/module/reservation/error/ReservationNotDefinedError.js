module.exports = class ReservationNotDefinedError extends Error {
  constructor() {
    super('Reservation not defined');
  }
};
