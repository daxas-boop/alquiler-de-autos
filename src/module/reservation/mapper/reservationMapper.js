const Reservation = require('../entity/reservation');

function fromFormToEntity({
  id,
  'car-id': carId,
  'customer-id': customerId,
  'start-date': startDate,
  'end-date': endDate,
  'payment-method': paymentMethod,
  'is-paid': isPaid,
}) {
  return new Reservation({
    id,
    carId,
    customerId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    paymentMethod,
    isPaid: isPaid === 'yes',
  });
}

function fromDbToEntity(
  { id, carId, customerId, car, customer, unitaryPrice, totalPrice, startDate, endDate, isPaid, paymentMethod },
  carMapper,
  customerMapper
) {
  return new Reservation({
    id,
    carId,
    customerId,
    car: car ? carMapper(car) : car,
    customer: customer ? customerMapper(customer) : customer,
    unitaryPrice,
    totalPrice,
    startDate,
    endDate,
    isPaid,
    paymentMethod,
  });
}

module.exports = { fromDbToEntity, fromFormToEntity };
