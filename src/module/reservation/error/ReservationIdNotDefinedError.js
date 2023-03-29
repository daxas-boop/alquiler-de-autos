module.exports = class ReservationIdNotDefinedError extends Error {
  constructor() {
    super('Reservation ID not defined');
  }
};
