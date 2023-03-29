const { fromDbToEntity } = require('../mapper/reservationMapper');
const ReservationNotFoundError = require('../error/ReservationNotFoundError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const Reservation = require('../entity/reservation');
const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const CarModel = require('../../car/model/carModel');
const CustomerModel = require('../../customer/model/customerModel');
const { fromDbToEntity: carFromDbToEntity } = require('../../car/mapper/carMapper');
const { fromDbToEntity: customerFromDbToEntity } = require('../../customer/mapper/customerMapper');

class ReservationRepository {
  constructor(ReservationModel) {
    this.ReservationModel = ReservationModel;
  }

  async getAll() {
    const reservations = await this.ReservationModel.findAll({
      include: [{ model: CarModel }, { model: CustomerModel }],
    });
    return reservations.map((reservation) => fromDbToEntity(reservation, carFromDbToEntity, customerFromDbToEntity));
  }

  async getById(id) {
    if (id === undefined) {
      throw new ReservationIdNotDefinedError();
    }
    const reservation = await this.ReservationModel.findByPk(id, {
      include: [{ model: CarModel }, { model: CustomerModel }],
    });
    if (!reservation) {
      throw new ReservationNotFoundError();
    }
    return fromDbToEntity(reservation, carFromDbToEntity, customerFromDbToEntity);
  }

  async save(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    const build = await this.ReservationModel.build(reservation, { isNewRecord: !reservation.id });
    await build.save();
    return this.getById(build.id);
  }
}

module.exports = ReservationRepository;
