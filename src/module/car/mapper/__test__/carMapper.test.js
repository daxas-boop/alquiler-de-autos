const Car = require('../../entity/car');
const { fromFormToEntity, fromDbToEntity } = require('../carMapper');

describe('carMapper', () => {
  test('fromFromToEntity should return an entity of type Car', () => {
    const formMock = { id: 1 };
    const mappedForm = fromFormToEntity(formMock);
    expect(mappedForm).toBeInstanceOf(Car);
    expect(mappedForm.id).toEqual(1);
  });

  test('fromDbToEntity should return an entity of type Car', () => {
    const dbResponseMock = { id: 1 };
    const mappedForm = fromDbToEntity(dbResponseMock);
    expect(mappedForm).toBeInstanceOf(Car);
    expect(mappedForm.id).toEqual(1);
  });
});
