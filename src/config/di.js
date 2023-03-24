const { Sequelize } = require('sequelize');
const { default: DIContainer, object, factory } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const { CarModel } = require('../module/car/model/carModel');

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

function configureCarModel(container) {
  return CarModel.initialize(container.get('Sequelize'));
}

function configureDI() {
  const container = new DIContainer();
  container.add({
    CarController: object(CarController).construct(container.use('CarService')),
    CarService: object(CarService).construct(container.use('CarRepository')),
    CarRepository: object(CarRepository).construct(container.use('CarModel')),
    CarModel: factory(configureCarModel),
    Sequelize: factory(configureSequelize),
  });
  return container;
}

module.exports = configureDI;
