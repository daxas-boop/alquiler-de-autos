const { fromDbToEntity } = require('../mapper/carMapper');
const { fromDbToEntity: reservationFromDbToEntity } = require('../../reservation/mapper/reservationMapper');
const CarNotFoundError = require('../error/CarNotFoundError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const Car = require('../entity/car');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const ReservationModel = require('../../reservation/model/reservationModel');

class CarRepository {
  constructor(CarModel) {
    this.CarModel = CarModel;
  }

  async getAll() {
    const cars = await this.CarModel.findAll();
    return cars.map((car) => fromDbToEntity(car));
  }

  async getById(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    const car = await this.CarModel.findByPk(id, {
      include: [{ model: ReservationModel, order: [['updatedAt', 'DESC']], limit: 3 }],
    });

    if (!car) {
      throw new CarNotFoundError();
    }

    return fromDbToEntity(car, reservationFromDbToEntity);
  }

  async save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }
    const build = await this.CarModel.build(car, { isNewRecord: !car.id });
    await build.save();

    return this.getById(build.id);
  }

  async delete(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    return !!(await this.CarModel.destroy({ where: { id } }));
  }
}

module.exports = CarRepository;
