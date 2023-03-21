const { fromDbToEntity } = require('../mapper/carMapper');

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

  getById(id) {
    const car = this.databaseAdapter
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
        FROM cars
        WHERE id = ?`
      )
      .get(id);
    return fromDbToEntity(car);
  }

  save(car) {
    let id;
    if (car.id) {
      id = car.id;
      this.databaseAdapter
        .prepare(
          `UPDATE cars SET
          brand = ?,
          model = ?,
          manufacture_year = ?,
          kilometer_mileage = ?,
          color = ?,
          has_air_conditioning = ?,
          passengers = ?,
          transmission = ?
          WHERE id = ?`
        )
        .run(
          car.brand,
          car.model,
          car.manufactureYear,
          car.kilometerMileage,
          car.color,
          car.hasAirConditioning,
          car.passengers,
          car.transmission,
          car.id
        );
    } else {
      const result = this.databaseAdapter
        .prepare(
          `INSERT INTO cars(
            brand,
            model,
            manufacture_year,
            kilometer_mileage,
            color,
            has_air_conditioning,
            passengers,
            transmission
            ) VALUES(?,?,?,?,?,?,?,?)`
        )
        .run(
          car.brand,
          car.model,
          car.manufactureYear,
          car.kilometerMileage,
          car.color,
          car.hasAirConditioning,
          car.passengers,
          car.transmission
        );
      id = result.lastInsertRowid;
    }
    return this.getById(id);
  }

  delete(id) {
    this.databaseAdapter.prepare('DELETE FROM cars WHERE id = ?').run(id);
  }
}

module.exports = CarRepository;
