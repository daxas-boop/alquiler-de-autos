const fromDbToEntity = require('../mapper/carMapper');

class CarRepository {
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
  }

  getAll() {
    const cars = this.databaseAdapter
      .prepare(
        `SELECT
        id, 
        brand,
        model,
        manufacture_year,
        kilometer_mileage,
        color,
        has_air_conditioning,
        passengers,
        transmission
        FROM cars`
      )
      .all();
    return cars.map((car) => fromDbToEntity(car));
  }
}

module.exports = CarRepository;
