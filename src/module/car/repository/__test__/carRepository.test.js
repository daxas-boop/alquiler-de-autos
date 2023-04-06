const { Sequelize } = require('sequelize');
const CarModel = require('../../model/carModel');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarNotFoundError = require('../../error/CarNotFoundError');
const CarRepository = require('../carRepository');
const createCarMock = require('./car.fixture');
const ReservationModel = require('../../../reservation/model/reservationModel');
const createReservationMock = require('../../../reservation/repository/__test__/reservation.fixture');

describe('CarRepository', () => {
  let repository;
  beforeEach(async () => {
    const sequelize = new Sequelize('sqlite::memory', { logging: false });
    const carModel = CarModel.initialize(sequelize);
    const reservationModel = ReservationModel.initialize(sequelize);
    carModel.hasMany(reservationModel, { foreignKey: 'carId', constraints: false });
    reservationModel.belongsTo(carModel, { foreignKey: 'carId', constraints: false });
    repository = new CarRepository(carModel);
    await sequelize.sync({ force: true });
  });

  test('save should create a new car if an id is NOT passed', async () => {
    const carMock = createCarMock();
    const savedCar = await repository.save(carMock);
    expect(savedCar.id).toEqual(1);
    expect(savedCar.brand).toEqual('Ford');
    expect(savedCar.model).toEqual('Ka');
  });

  test('save should update a car if an id is passed', async () => {
    const savedCar = await repository.save(createCarMock());
    expect(savedCar.id).toEqual(1);
    expect(savedCar.brand).toEqual('Ford');
    expect(savedCar.model).toEqual('Ka');
    savedCar.brand = 'Peugeot';
    savedCar.model = '208';

    const updatedCar = await repository.save(savedCar);
    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.brand).toEqual('Peugeot');
    expect(updatedCar.model).toEqual('208');
  });

  test('save should throw an error when no car instance is passed', async () => {
    await expect(repository.save).rejects.toThrow(CarNotDefinedError);
  });

  test('getById returns a car', async () => {
    await repository.save(createCarMock());
    const car = await repository.getById(1);
    expect(car.id).toEqual(1);
    expect(car.brand).toEqual('Ford');
  });

  test('getById returns a car with his associated reservations', async () => {
    await repository.save(createCarMock());
    ReservationModel.create(createReservationMock());
    const car = await repository.getById(1);
    expect(car.id).toEqual(1);
    expect(car.brand).toEqual('Ford');
    expect(car.reservations).toHaveLength(1);
  });

  test('getById throws an error if the car was not found', async () => {
    await repository.save(createCarMock());
    await expect(repository.getById(999)).rejects.toThrow(CarNotFoundError);
  });
  test('getById throws an error if an id is NOT passed', async () => {
    await expect(repository.getById()).rejects.toThrow(CarIdNotDefinedError);
  });

  test('getAll returns all the cars', async () => {
    await repository.save(createCarMock());
    await repository.save(createCarMock());
    const cars = await repository.getAll();
    expect(cars).toHaveLength(2);
    expect(cars[0].id).toEqual(1);
    expect(cars[1].id).toEqual(2);
  });

  test('delete throws an error if an id is NOT passed', async () => {
    await expect(repository.delete()).rejects.toThrow(CarIdNotDefinedError);
  });

  test('delete should delete a car from the database', async () => {
    await repository.save(createCarMock());
    const savedCar = await repository.getById(1);
    expect(savedCar.id).toBe(1);
    await repository.delete(savedCar.id);
    await expect(repository.getById(1)).rejects.toThrow(CarNotFoundError);
  });
});
