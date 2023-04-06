const Car = require('../entity/car');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../error/CarNotDefinedError');

class CarService {
  constructor(carRepository) {
    this.repository = carRepository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    return this.repository.getById(id);
  }

  async save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return this.repository.save(car);
  }

  async delete(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    return this.repository.delete(id);
  }
}

module.exports = CarService;
