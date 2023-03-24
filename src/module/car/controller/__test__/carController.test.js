const Car = require('../../entity/car');
const CarController = require('../carController');
const { createNewCar } = require('../../repository/__test__/car.fixture');

const serviceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  save: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true)),
};

const controller = new CarController(serviceMock);

describe('CarController', () => {
  test('configureRoutes should configure the routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    controller.configureRoutes(app);
    expect(app.get).toHaveBeenCalledTimes(5);
    expect(app.post).toHaveBeenCalledTimes(2);
  });

  test('index should render index.njk', async () => {
    const renderMock = jest.fn();
    await controller.index({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/index.njk', { cars: [] });
  });

  test('create should render create.njk', () => {
    const renderMock = jest.fn();
    controller.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/create.njk');
  });

  test('view should render view.njk with a car', async () => {
    const renderMock = jest.fn();
    const carMock = createNewCar(1);
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(carMock));
    await controller.view({ params: { id: carMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/view.njk', { car: carMock });
  });

  test('view should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.view({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/error.njk', { error: 'test' });
  });

  test('delete should call the delete method from the service with an id from params and redirect to /car', async () => {
    const redirectMock = jest.fn();
    const ID = 1;
    await controller.delete({ params: { id: ID } }, { redirect: redirectMock });
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(ID);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/car');
  });

  test('delete should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.delete.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.delete({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/error.njk', { error: 'test' });
  });

  test('save should call the save method from the service with a new instance of a Car', async () => {
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
    await controller.save({ body: formMock }, { redirect: redirectMock });
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(
      new Car(
        formMock.id,
        formMock.brand,
        formMock.model,
        formMock['manufacture-year'],
        formMock['kilometer-mileage'],
        formMock.color,
        true,
        formMock.passengers,
        formMock.transmission
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
    expect(renderMock).toHaveBeenCalledWith('car/views/error.njk', { error: 'test' });
  });

  test('edit should render edit.njk with a car', async () => {
    const renderMock = jest.fn();
    const carMock = createNewCar(1);
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(carMock));
    await controller.edit({ params: { id: carMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/edit.njk', { car: carMock });
  });

  test('edit should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.edit({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/error.njk', { error: 'test' });
  });

  test('confirmDelete should render delete.njk with the car id', async () => {
    const renderMock = jest.fn();
    const ID = 1;
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(new Car(1)));
    await controller.confirmDelete({ params: { id: ID } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/delete.njk', { id: ID });
  });

  test('confirmDelete should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    serviceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await controller.confirmDelete({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/views/error.njk', { error: 'test' });
  });
});
