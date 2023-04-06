const { Sequelize } = require('sequelize');
const CustomerModel = require('../../model/customerModel');
const CustomerIdNotDefinedError = require('../../error/CustomerIdNotDefinedError');
const CustomerNotDefinedError = require('../../error/CustomerNotDefinedError');
const CustomerNotFoundError = require('../../error/CustomerNotFoundError');
const CustomerRepository = require('../customerRepository');
const createCustomerMock = require('./customer.fixture');
const ReservationModel = require('../../../reservation/model/reservationModel');
const createReservationMock = require('../../../reservation/repository/__test__/reservation.fixture');

const sequelize = new Sequelize('sqlite::memory', { logging: false });

describe('CustomerRepository', () => {
  let repository;
  beforeEach(async () => {
    const customerModel = CustomerModel.initialize(sequelize);
    const reservationModel = ReservationModel.initialize(sequelize);
    customerModel.hasMany(reservationModel, { foreignKey: 'customerId', constraints: false });
    reservationModel.hasOne(customerModel, { foreignKey: 'customerId', constraints: false });
    repository = new CustomerRepository(customerModel);
    await sequelize.sync({ force: true });
  });

  test('save should create a new customer if the entity has no id', async () => {
    const customerMock = createCustomerMock();
    const savedCustomer = await repository.save(customerMock);
    expect(savedCustomer.id).toEqual(1);
  });

  test('save should update a customer if the entity has an id', async () => {
    const customerMock = createCustomerMock();
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
    await repository.save(createCustomerMock());
    const customer = await repository.getById(1);
    expect(customer.id).toEqual(1);
  });

  test('getById returns a customer with his associated reservations', async () => {
    await repository.save(createCustomerMock());
    ReservationModel.create(createReservationMock());
    const customer = await repository.getById(1);
    expect(customer.id).toEqual(1);
    expect(customer.reservations).toHaveLength(1);
  });

  test('getById throws an error if the customer was not found', async () => {
    await repository.save(createCustomerMock());
    await expect(repository.getById(999)).rejects.toThrow(CustomerNotFoundError);
  });

  test('getById throws an error if an id is NOT passed', async () => {
    await expect(repository.getById()).rejects.toThrow(CustomerIdNotDefinedError);
  });

  test('getAll returns all the customers', async () => {
    await repository.save(createCustomerMock());
    await repository.save(createCustomerMock());
    const customers = await repository.getAll();
    expect(customers).toHaveLength(2);
    expect(customers[0].id).toEqual(1);
    expect(customers[1].id).toEqual(2);
  });

  test('delete throws an error if an id is NOT passed', async () => {
    await expect(repository.delete()).rejects.toThrow(CustomerIdNotDefinedError);
  });

  test('delete should delete a customer from the database', async () => {
    await repository.save(createCustomerMock());
    const savedCustomer = await repository.getById(1);
    expect(savedCustomer.id).toBe(1);
    await repository.delete(savedCustomer.id);
    await expect(repository.getById(1)).rejects.toThrow(CustomerNotFoundError);
  });
});
