const { Sequelize } = require('sequelize');
const { CustomerModel } = require('../../model/customerModel');
const CustomerIdNotDefinedError = require('../../error/CustomerIdNotDefinedError');
const CustomerNotDefinedError = require('../../error/CustomerNotDefinedError');
const CustomerNotFoundError = require('../../error/CustomerNotFoundError');
const CustomerRepository = require('../customerRepository');
const { createNewCustomer } = require('./customer.fixture');

const sequelize = new Sequelize('sqlite::memory', { logging: false });

let repository;

beforeAll(() => {
  const customerModel = CustomerModel.initialize(sequelize);
  repository = new CustomerRepository(customerModel);
});

describe('CustomerRepository', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  test('save should create a new customer if the entity has no id', async () => {
    const customerMock = createNewCustomer();
    const savedCustomer = await repository.save(customerMock);
    expect(savedCustomer.id).toEqual(1);
  });

  test('save should update a customer if the entity has an id', async () => {
    const customerMock = createNewCustomer();
    const savedCustomer = await repository.save(customerMock);
    expect(savedCustomer.id).toEqual(1);
    savedCustomer.name = 'Pepe';

    const updatedCustomer = await repository.save(savedCustomer);
    expect(updatedCustomer.id).toEqual(1);
    expect(updatedCustomer.name).toEqual('Pepe');
  });

  test('save should throw an error when no customer instance is passed', async () => {
    await expect(repository.save).rejects.toThrow(CustomerNotDefinedError);
  });

  test('getById returns a customer', async () => {
    await repository.save(createNewCustomer());
    const customer = await repository.getById(1);
    expect(customer.id).toEqual(1);
  });

  test('getById throws an error if the customer was not found', async () => {
    await repository.save(createNewCustomer());
    await expect(repository.getById(999)).rejects.toThrow(CustomerNotFoundError);
  });

  test('getById throws an error if an id is NOT passed', async () => {
    await expect(repository.getById()).rejects.toThrow(CustomerIdNotDefinedError);
  });

  test('getAll returns all the customers', async () => {
    await repository.save(createNewCustomer());
    await repository.save(createNewCustomer());
    const customers = await repository.getAll();
    expect(customers).toHaveLength(2);
    expect(customers[0].id).toEqual(1);
    expect(customers[1].id).toEqual(2);
  });

  test('delete throws an error if an id is NOT passed', async () => {
    await expect(repository.delete()).rejects.toThrow(CustomerIdNotDefinedError);
  });

  test('delete should delete a customer from the database', async () => {
    await repository.save(createNewCustomer());
    const savedCustomer = await repository.getById(1);
    expect(savedCustomer.id).toBe(1);
    await repository.delete(savedCustomer.id);
    await expect(repository.getById(1)).rejects.toThrow(CustomerNotFoundError);
  });
});
