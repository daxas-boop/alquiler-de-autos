const Customer = require('../../entity/customer');
const { fromFormToEntity, fromDbToEntity } = require('../customerMapper');

describe('customerMapper', () => {
  test('fromFromToEntity should return an entity of type Customer', () => {
    const formMock = { id: 1 };
    const mappedForm = fromFormToEntity(formMock);
    expect(mappedForm).toBeInstanceOf(Customer);
    expect(mappedForm.id).toEqual(1);
  });

  test('fromDbToEntity should return an entity of type Customer', () => {
    const dbResponseMock = { id: 1 };
    const mappedForm = fromDbToEntity(dbResponseMock);
    expect(mappedForm).toBeInstanceOf(Customer);
    expect(mappedForm.id).toEqual(1);
  });
});
