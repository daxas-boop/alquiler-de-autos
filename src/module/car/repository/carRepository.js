const { fromDbToEntity } = require('../mapper/carMapper');
const CarNotFoundError = require('../error/CarNotFoundError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const Car = require('../entity/car');
const CarNotDefinedError = require('../error/CarNotDefinedError');

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
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

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

    if (!car) {
      throw new CarNotFoundError(`The car with id ${id} was not found`);
    }

    return fromDbToEntity(car);
  }

  save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

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
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    this.databaseAdapter.prepare('DELETE FROM cars WHERE id = ?').run(id);
  }
}

module.exports = CarRepository;
