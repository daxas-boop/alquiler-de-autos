const { Sequelize } = require('sequelize');
const { default: DIContainer, object, factory } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const { CustomerController, CustomerService, CustomerRepository } = require('../module/customer/module');
const { CarModel } = require('../module/car/model/carModel');
const { CustomerModel } = require('../module/customer/model/customerModel');

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

function configureCarModel(container) {
  return CarModel.initialize(container.get('Sequelize'));
}

function configureCustomerModel(container) {
  return CustomerModel.initialize(container.get('Sequelize'));
}

function addCustomerModuleDefinitions(container) {
  container.add({
    CustomerController: object(CustomerController).construct(container.use('CustomerService')),
    CustomerService: object(CustomerService).construct(container.use('CustomerRepository')),
    CustomerRepository: object(CustomerRepository).construct(container.use('CustomerModel')),
    CustomerModel: factory(configureCustomerModel),
  });
}

function addCarModuleDefinitions(container) {
  container.add({
    CarController: object(CarController).construct(container.use('CarService')),
    CarService: object(CarService).construct(container.use('CarRepository')),
    CarRepository: object(CarRepository).construct(container.use('CarModel')),
    CarModel: factory(configureCarModel),
    Sequelize: factory(configureSequelize),
  });
}

function configureDI() {
  const container = new DIContainer();
  addCarModuleDefinitions(container);
  addCustomerModuleDefinitions(container);
  return container;
}

module.exports = configureDI;
