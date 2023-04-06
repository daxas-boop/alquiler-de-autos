const Reservation = require('../../entity/reservation');

function createReservationMock(id, invalidDates) {
  return new Reservation({
    id,
    car: { id: 1 },
    customer: { id: 1 },
    carId: 1,
    customerId: 1,
    startDate: invalidDates ? new Date(2020, 1, 30) : new Date(2020, 1, 20),
    endDate: new Date(2020, 1, 25),
    isPaid: true,
    paymentMethod: 'cash',
    totalPrice: 3000,
    unitaryPrice: 300,
  });
}

module.exports = createReservationMock;
