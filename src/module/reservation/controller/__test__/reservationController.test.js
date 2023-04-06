const Reservation = require('../../entity/reservation');
const ReservationController = require('../reservationController');
const createReservationMock = require('../../repository/__test__/reservation.fixture');

const reservationServiceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  save: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true)),
};

const carServiceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
};

const customerServiceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
};

const reservationController = new ReservationController(reservationServiceMock, carServiceMock, customerServiceMock);

describe('ReservationController', () => {
  test('configureRoutes should configure the routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    reservationController.configureRoutes(app);
    expect(app.get).toHaveBeenCalledTimes(4);
    expect(app.post).toHaveBeenCalledTimes(1);
  });

  test('viewAll should render view-all.njk', async () => {
    const renderMock = jest.fn();
    await reservationController.viewAll({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/view-all.njk', { reservations: [] });
  });

  test('create should render create.njk if there is at least one car and one customer', async () => {
    const renderMock = jest.fn();
    carServiceMock.getAll.mockImplementationOnce(() => Promise.resolve([{}]));
    customerServiceMock.getAll.mockImplementationOnce(() => Promise.resolve([{}]));
    await reservationController.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/create.njk', { cars: [{}], customers: [{}] });
  });

  test('create should render error.njk when there are no cars', async () => {
    const renderMock = jest.fn();
    customerServiceMock.getAll.mockImplementationOnce(() => Promise.resolve([{}]));
    await reservationController.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/error.njk', {
      error: 'You need at least one car to create a reservation',
    });
  });

  test('create should render error.njk when there are no customers', async () => {
    const renderMock = jest.fn();
    carServiceMock.getAll.mockImplementationOnce(() => Promise.resolve([{}]));
    await reservationController.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/error.njk', {
      error: 'You need at least one customer to create a reservation',
    });
  });

  test('view should render view.njk with a reservation', async () => {
    const renderMock = jest.fn();
    const reservationMock = createReservationMock(1);
    reservationServiceMock.getById.mockImplementationOnce(() => Promise.resolve(reservationMock));
    await reservationController.view({ params: { id: reservationMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/view.njk', { reservation: reservationMock });
  });

  test('view should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    reservationServiceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await reservationController.view({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/error.njk', { error: 'test' });
  });

  test('save should call the save method from the service with a new instance of Reservation', async () => {
    const redirectMock = jest.fn();
    const formMock = {
      id: '1',
      'car-id': '1',
      'customer-id': '1',
      'start-date': '2020-02-22',
      'end-date': '2020-02-22',
      'payment-method': 'cash',
      'is-pais': 'yes',
    };
    await reservationController.save({ body: formMock }, { redirect: redirectMock });
    expect(reservationServiceMock.save).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.save).toHaveBeenCalledWith(
      new Reservation({
        id: formMock.id,
        car: {},
        carId: '1',
        customer: {},
        customerId: '1',
        isPaid: false,
        paymentMethod: 'cash',
        startDate: new Date('2020-02-22'),
        endDate: new Date('2020-02-22'),
      })
    );
  });

  test('save should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    const redirectMock = jest.fn();
    reservationServiceMock.save.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await reservationController.save({ body: {} }, { render: renderMock, redirect: redirectMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/error.njk', { error: 'test' });
  });

  test('edit should render edit.njk with a reservation, the cars and customers', async () => {
    const renderMock = jest.fn();
    const reservationMock = createReservationMock(1);
    reservationServiceMock.getById.mockImplementationOnce(() => Promise.resolve(reservationMock));
    await reservationController.edit({ params: { id: reservationMock.id } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/edit.njk', {
      cars: [],
      customers: [],
      reservation: reservationMock,
    });
  });

  test('edit should render error.njk with the error message if an error is thrown', async () => {
    const renderMock = jest.fn();
    reservationServiceMock.getById.mockImplementationOnce(() => Promise.reject(new Error('test')));
    await reservationController.edit({ params: { id: 1 } }, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('reservation/views/error.njk', { error: 'test' });
  });
});
