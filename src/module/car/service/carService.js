class CarService {
  constructor(carRepository) {
    this.repository = carRepository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(car) {
    return this.repository.save(car);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = CarService;
