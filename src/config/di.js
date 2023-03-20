const Database = require('better-sqlite3');
const { default: DIContainer, object, factory } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');

function configureDatabaseAdapter() {
  return new Database(process.env.DB_PATH);
}

function configureDI() {
  const container = new DIContainer();
  container.add({
    CarController: object(CarController).construct(container.use('CarService')),
    CarService: object(CarService).construct(container.use('CarRepository')),
    CarRepository: object(CarRepository).construct(container.use('DatabaseAdapter')),
    DatabaseAdapter: factory(configureDatabaseAdapter),
  });
  return container;
}

module.exports = configureDI;
