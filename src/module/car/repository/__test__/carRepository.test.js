const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarNotFoundError = require('../../error/CarNotFoundError');
const CarRepository = require('../carRepository');
const { createNewCar } = require('./car.fixture');

let mockDatabase;

beforeEach(() => {
  mockDatabase = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDatabase.exec(migration);
});

test('save should create a new car if an id is NOT passed', () => {
  const repository = new CarRepository(mockDatabase);
  const savedCar = repository.save(createNewCar());
  expect(savedCar.id).toEqual(1);
  expect(savedCar.brand).toEqual('Ford');
  expect(savedCar.model).toEqual('Ka');
});

test('save should update a car if an id is passed', () => {
  const repository = new CarRepository(mockDatabase);
  const savedCar = repository.save(createNewCar());
  expect(savedCar.id).toEqual(1);
  expect(savedCar.brand).toEqual('Ford');
  expect(savedCar.model).toEqual('Ka');
  savedCar.brand = 'Peugeot';
  savedCar.model = '208';

  const updatedCar = repository.save(savedCar);
  expect(updatedCar.id).toEqual(1);
  expect(updatedCar.brand).toEqual('Peugeot');
  expect(updatedCar.model).toEqual('208');
});

test('save should throw an error when no car instance is passed', () => {
  const repository = new CarRepository(mockDatabase);
  expect(() => repository.save({})).toThrow(CarNotDefinedError);
});

test('getById returns a car', () => {
  const repository = new CarRepository(mockDatabase);
  repository.save(createNewCar());
  const car = repository.getById(1);
  expect(car.id).toEqual(1);
  expect(car.brand).toEqual('Ford');
});

test('getById throws an error if the car was not found', async () => {
  const repository = new CarRepository(mockDatabase);
  repository.save(createNewCar());
  expect(() => repository.getById(999)).toThrow(CarNotFoundError);
});

test('getById throws an error if an id is NOT passed', async () => {
  const repository = new CarRepository(mockDatabase);
  expect(() => repository.getById()).toThrow(CarIdNotDefinedError);
});

test('getAll returns all the cars', () => {
  const repository = new CarRepository(mockDatabase);
  repository.save(createNewCar());
  repository.save(createNewCar());
  const cars = repository.getAll();
  expect(cars).toHaveLength(2);
  expect(cars[0].id).toEqual(1);
  expect(cars[1].id).toEqual(2);
});

test('delete throws an error if an id is NOT passed', async () => {
  const repository = new CarRepository(mockDatabase);
  expect(() => repository.delete()).toThrow(CarIdNotDefinedError);
});

test('delete should delete a car from the database', async () => {
  const repository = new CarRepository(mockDatabase);
  repository.save(createNewCar());
  const savedCar = repository.getById(1);
  expect(savedCar.id).toBe(1);
  repository.delete(savedCar.id);
  expect(() => repository.getById(1)).toThrow(CarNotFoundError);
});
