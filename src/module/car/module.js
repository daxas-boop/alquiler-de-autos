const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');

function initialize(app, container) {
  const carController = container.get('CarController');
  carController.configureRoutes(app);
}

module.exports = {
  initialize,
  CarController,
  CarService,
  CarRepository,
};
