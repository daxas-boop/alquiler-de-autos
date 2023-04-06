const { Sequelize } = require('sequelize');
const { default: DIContainer, object, factory } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const { CustomerController, CustomerService, CustomerRepository } = require('../module/customer/module');
const { ReservationController, ReservationService, ReservationRepository } = require('../module/reservation/module');
const CarModel = require('../module/car/model/carModel');
const CustomerModel = require('../module/customer/model/customerModel');
const ReservationModel = require('../module/reservation/model/reservationModel');
const multer = require('multer');

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

function configureMulter() {
  return multer({ dest: './public/images/cars' });
}

function configureCarModel(container) {
  return CarModel.initialize(container.get('Database'));
}

function configureCustomerModel(container) {
  return CustomerModel.initialize(container.get('Database'));
}

function configureReservationModel(container) {
  const model = ReservationModel.initialize(container.get('Database'));
  model.setupAssociations(container.get('CarModel'), container.get('CustomerModel'));
  return model;
}

function addCommonDefinitions(container) {
  container.add({
    Database: factory(configureSequelize),
    UploadFileMiddleware: factory(configureMulter),
  });
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
    CarController: object(CarController).construct(container.use('CarService'), container.use('UploadFileMiddleware')),
    CarService: object(CarService).construct(container.use('CarRepository')),
    CarRepository: object(CarRepository).construct(container.use('CarModel')),
    CarModel: factory(configureCarModel),
  });
}

function addReservationModuleDefinitions(container) {
  container.add({
    ReservationController: object(ReservationController).construct(
      container.use('ReservationService'),
      container.use('CarService'),
      container.use('CustomerService')
    ),
    ReservationService: object(ReservationService).construct(container.use('ReservationRepository')),
    ReservationRepository: object(ReservationRepository).construct(container.use('ReservationModel')),
    ReservationModel: factory(configureReservationModel),
  });
}

function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addCustomerModuleDefinitions(container);
  addReservationModuleDefinitions(container);
  return container;
}

module.exports = configureDI;
