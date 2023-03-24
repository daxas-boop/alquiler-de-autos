const Customer = require('../../entity/customer');
const CustomerIdNotDefinedError = require('../../error/CustomerIdNotDefinedError');
const CustomerNotDefinedError = require('../../error/CustomerNotDefinedError');
const CustomerService = require('../customerService');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const service = new CustomerService(repositoryMock);

describe('CustomerService', () => {
  test('getAll should call the getAll method from the repository', async () => {
    await service.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('getById should call the getById method from the repository if an id is passed', async () => {
    await service.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  });

  test('getById should throw an error if an id is NOT passed', async () => {
    await expect(service.getById()).rejects.toThrowError(CustomerIdNotDefinedError);
  });

  test('delete should call the delete method from the repository if an id is passed', async () => {
    await service.delete(1);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  test('delete should throw an error if an id is NOT passed', async () => {
    await expect(service.delete()).rejects.toThrowError(CustomerIdNotDefinedError);
  });

  test('save should call the save method from the repository if an instance of a customer is passed', async () => {
    const customerMock = new Customer(1);
    await service.save(customerMock);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  test('save should throw an error if an instance of a customer is NOT passed', async () => {
    await expect(service.save()).rejects.toThrowError(CustomerNotDefinedError);
  });
});
