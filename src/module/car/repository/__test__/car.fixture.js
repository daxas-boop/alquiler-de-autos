const Car = require('../../entity/car');

function createNewCar(id) {
  return new Car(id, 'Ford', 'Ka', 2020, 200000, 'Rojo', 'yes', 4, 'manual');
}

module.exports = { createNewCar };
