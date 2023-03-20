class CarService {
  constructor(carRepository) {
    this.repository = carRepository;
  }

  async getAll() {
    return this.repository.getAll();
  }
}

module.exports = CarService;
