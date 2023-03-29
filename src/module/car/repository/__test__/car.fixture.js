const Car = require('../../entity/car');

function createCarMock(id) {
  return new Car(id, 'Ford', 'Ka', 2020, 200000, 'Rojo', 'yes', 4, 'manual', 200, '/public/image.png');
}

module.exports = createCarMock;
