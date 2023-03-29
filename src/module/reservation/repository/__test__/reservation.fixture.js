const Reservation = require('../../entity/reservation');
const createCarMock = require('../../../car/repository/__test__/car.fixture');
const createCustomerMock = require('../../../customer/repository/__test__/customer.fixture');

function createReservationMock(id) {
  return new Reservation({
    id,
    car: createCarMock(1),
    customer: createCustomerMock(1),
    carId: 1,
    customerId: 1,
    endDate: new Date(),
    startDate: new Date(),
    isPaid: true,
    paymentMethod: 'cash',
    totalPrice: 3000,
    unitaryPrice: 300,
  });
}

module.exports = createReservationMock;
