const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const ReservationService = require('../reservationService');
const createReservationMock = require('../../repository/__test__/reservation.fixture');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const service = new ReservationService(repositoryMock);

describe('ReservationService', () => {
  test('getAll should call the getAll method from the repository', async () => {
    await service.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('getById should call the getById method from the repository if an id is passed', async () => {
    await service.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  });

  test('getById should throw an error if an id is NOT passed', async () => {
    await expect(service.getById()).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('save should call the save method from the repository if an instance of a reservation is passed', async () => {
    const reservationMock = createReservationMock(1);
    await service.save(reservationMock);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  test('save should throw an error if an instance of a reservation is NOT passed', async () => {
    await expect(service.save()).rejects.toThrowError(ReservationNotDefinedError);
  });
});
