const Reservation = require('../../entity/reservation');
const { fromFormToEntity, fromDbToEntity } = require('../reservationMapper');

describe('reservationMapper', () => {
  test('fromFormToEntity should return an entity of type Reservation', () => {
    const formMock = {};
    expect(fromFormToEntity(formMock)).toBeInstanceOf(Reservation);
  });

  test('fromDbToEntity should return an entity of type Reservation', () => {
    const dbResponseMock = {};
    expect(fromDbToEntity(dbResponseMock)).toBeInstanceOf(Reservation);
  });

  test('fromDbToEntity should use the provided mappers to map the car and customer properties', () => {
    const dbResponseMock = {
      car: {},
      customer: {},
    };
    const carMapperMock = jest.fn((car) => (car.brand = 'car name'));
    const customerMapperMock = jest.fn((customer) => (customer.name = 'customer name'));
    expect(fromDbToEntity(dbResponseMock, carMapperMock, customerMapperMock)).toBeInstanceOf(Reservation);
    expect(carMapperMock).toHaveBeenCalledTimes(1);
    expect(customerMapperMock).toHaveBeenCalledTimes(1);
    expect(carMapperMock).toHaveBeenCalledWith({
      brand: 'car name',
    });
    expect(customerMapperMock).toHaveBeenCalledWith({
      name: 'customer name',
    });
  });
});
