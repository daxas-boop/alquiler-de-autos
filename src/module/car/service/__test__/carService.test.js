const Car = require('../../entity/car');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarService = require('../carService');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const service = new CarService(repositoryMock);

test('getAll should call the getAll method from the repository', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('getById should call the getById method from the repository if an id is passed', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('getById should throw an error if an id is NOT passed', () => {
  expect(service.getById()).rejects.toThrowError(CarIdNotDefinedError);
});

test('delete should call the delete method from the repository if an id is passed', () => {
  service.delete(1);
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('delete should throw an error if an id is NOT passed', () => {
  expect(service.delete()).rejects.toThrowError(CarIdNotDefinedError);
});

test('save should call the save method from the repository if an instance of a car is passed', () => {
  const carMock = new Car(1);
  service.save(carMock);
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('save should throw an error if an instance of a car is NOT passed', () => {
  expect(service.save()).rejects.toThrowError(CarNotDefinedError);
});
