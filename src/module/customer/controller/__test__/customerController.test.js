const Customer = require('../../entity/customer');
const CustomerController = require('../customerController');
const { createNewCustomer } = require('../../repository/__test__/customer.fixture');

const serviceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  save: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true)),
};

const controller = new CustomerController(serviceMock);

describe('CustomerController', () => {
  test('configureRoutes should configure the routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    controller.configureRoutes(app);
    expect(app.get).toHaveBeenCalledTimes(5);
    expect(app.post).toHaveBeenCalledTimes(2);
  });

  test('viewAll should render view-all.njk', async () => {
    const renderMock = jest.fn();
    await controller.viewAll({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/view-all.njk', { customers: [] });
  });

  test('create should render create.njk', () => {
    const renderMock = jest.fn();
    controller.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/create.njk');
  });

  test('view should render view.njk with a customer', async () => {
    const renderMock = jest.fn();
    const customerMock = createNewCustomer(1);
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(customerMock));
    await controller.view({ params: { id: customerMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/view.njk', { customer: customerMock });
  });

  test('view should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.view({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/error.njk', { error: 'test' });
  });

  test('delete should call the delete method from the service with an id from params and redirect to /customer', async () => {
    const redirectMock = jest.fn();
    const ID = 1;
    await controller.delete({ params: { id: ID } }, { redirect: redirectMock });
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(ID);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/customer');
  });

  test('delete should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.delete.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.delete({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/error.njk', { error: 'test' });
  });

  test('save should call the save method from the service with a new instance of a Customer', async () => {
    const redirectMock = jest.fn();
    const formMock = {
      id: '1',
      name: 'Timber',
      surname: 'Saw',
      'document-type': 'DNI',
      'document-number': '20000',
      nationality: 'Argentino',
      address: 'Esquiu y Ramon Cabrero',
      phone: '3333-4444',
      email: 'timber@saw.com',
      birthdate: '2020-10-01',
    };
    await controller.save({ body: formMock }, { redirect: redirectMock });
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(
      new Customer(
        formMock.id,
        formMock.name,
        formMock.surname,
        formMock['document-type'],
        formMock['document-number'],
        formMock.nationality,
        formMock.address,
        formMock.phone,
        formMock.email,
        formMock.birthdate
      )
    );
  });

  test('save should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    const redirectMock = jest.fn();
    const formMock = {
      id: 1,
      brand: 'Ford',
      model: 'Ka',
      'manufacture-year': 2003,
      'kilometer-mileage': 20000,
      color: 'rojo',
      'has-air-conditioning': 'yes',
      passengers: 4,
      transmission: 'manual',
    };
    serviceMock.save.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.save({ body: formMock }, { render: renderMock, redirect: redirectMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/error.njk', { error: 'test' });
  });

  test('edit should render edit.njk with a customer', async () => {
    const renderMock = jest.fn();
    const customerMock = createNewCustomer(1);
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(customerMock));
    await controller.edit({ params: { id: customerMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/edit.njk', { customer: customerMock });
  });

  test('edit should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.edit({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/error.njk', { error: 'test' });
  });

  test('confirmDelete should render delete.njk with the customer id', async () => {
    const renderMock = jest.fn();
    const ID = 1;
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(new Customer(1)));
    await controller.confirmDelete({ params: { id: ID } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/delete.njk', { id: ID });
  });

  test('confirmDelete should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.confirmDelete({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('customer/views/error.njk', { error: 'test' });
  });
});
