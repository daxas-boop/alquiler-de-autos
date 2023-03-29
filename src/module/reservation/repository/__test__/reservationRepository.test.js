const { Sequelize } = require('sequelize');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const ReservationNotFoundError = require('../../error/ReservationNotFoundError');
const ReservationRepository = require('../reservationRepository');
const createReservationMock = require('./reservation.fixture');
const ReservationModel = require('../../model/reservationModel');
const CarModel = require('../../../car/model/carModel');
const CustomerModel = require('../../../customer/model/customerModel');
const createCarMock = require('../../../car/repository/__test__/car.fixture');
const createCustomerMock = require('../../../customer/repository/__test__/customer.fixture');

describe('ReservationRepository', () => {
  let repository;
  beforeEach(async () => {
    const sequelize = new Sequelize('sqlite::memory', { logging: false });
    const reservationModel = ReservationModel.initialize(sequelize);
    CarModel.initialize(sequelize);
    CustomerModel.initialize(sequelize);
    reservationModel.setupAssociations(CarModel, CustomerModel);
    repository = new ReservationRepository(reservationModel);

    await sequelize.sync({ force: true });
  });

  test('save should create a new reservation if the entity has no id', async () => {
    const reservationMock = createReservationMock();
    const savedReservation = await repository.save(reservationMock);
    expect(savedReservation.id).toEqual(1);
  });

  test('save should update a reservation if the entity has an id', async () => {
    const reservationMock = createReservationMock();
    const savedReservation = await repository.save(reservationMock);
    expect(savedReservation.id).toEqual(1);
    expect(savedReservation.unitaryPrice).toEqual(300);
    savedReservation.unitaryPrice = 600;

    const updatedReservation = await repository.save(savedReservation);
    expect(updatedReservation.id).toEqual(1);
    expect(updatedReservation.unitaryPrice).toEqual(600);
  });

  test('save should throw an error when no reservation instance is passed', async () => {
    await expect(repository.save).rejects.toThrow(ReservationNotDefinedError);
  });

  test('getById returns a reservation with his associated car and customer', async () => {
    await repository.save(createReservationMock());
    await CarModel.create(createCarMock(1));
    await CustomerModel.create(createCustomerMock(1));
    const reservation = await repository.getById(1);
    expect(reservation.id).toEqual(1);
    expect(reservation.car.id).toEqual(1);
    expect(reservation.customer.id).toEqual(1);
  });

  test('getById throws an error if the reservation was not found', async () => {
    await repository.save(createReservationMock());
    await expect(repository.getById(999)).rejects.toThrow(ReservationNotFoundError);
  });

  test('getById throws an error if an id is NOT passed', async () => {
    await expect(repository.getById()).rejects.toThrow(ReservationIdNotDefinedError);
  });

  test('getAll returns all the reservations with their associated cars and customers', async () => {
    await repository.save(createReservationMock());
    await CarModel.create(createCarMock(1));
    await CustomerModel.create(createCustomerMock(1));
    const reservations = await repository.getAll();
    expect(reservations).toHaveLength(1);
    expect(reservations[0].id).toEqual(1);
    expect(reservations[0].car.id).toEqual(1);
    expect(reservations[0].customer.id).toEqual(1);
  });
});
