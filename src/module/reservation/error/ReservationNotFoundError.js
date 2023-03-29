module.exports = class ReservationNotFoundError extends Error {
  constructor() {
    super('Reservation not found');
  }
};
