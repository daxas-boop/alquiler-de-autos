const Customer = require('../../entity/customer');

function createNewCustomer(id) {
  return new Customer(
    id,
    'Juan',
    'Perez',
    'DNI',
    '2000',
    'Argentino',
    'Ramon Cabrero y Esquiu',
    '555-555',
    'timber@saw.com',
    '2020-10-01'
  );
}

module.exports = { createNewCustomer };
