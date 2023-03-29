const Reservation = require('../entity/reservation');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');

class ReservationService {
  constructor(reservationRepository) {
    this.repository = reservationRepository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new ReservationIdNotDefinedError();
    }

    return this.repository.getById(id);
  }

  async save(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    reservation.unitaryPrice = reservation.car.pricePerDay;
    reservation.totalPrice = reservation.calculateTotalPrice();
    return this.repository.save(reservation);
  }
}

module.exports = ReservationService;
