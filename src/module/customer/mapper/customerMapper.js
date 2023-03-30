const Customer = require('../entity/customer');

function fromFormToEntity({
  id,
  name,
  surname,
  'document-type': documentType,
  'document-number': documentNumber,
  nationality,
  address,
  phone,
  email,
  birthdate,
}) {
  return new Customer(id, name, surname, documentType, documentNumber, nationality, address, phone, email, birthdate);
}

function fromDbToEntity(
  { id, name, surname, documentType, documentNumber, nationality, address, phone, email, birthdate, reservations },
  reservationMapper
) {
  return new Customer(
    id,
    name,
    surname,
    documentType,
    documentNumber,
    nationality,
    address,
    phone,
    email,
    birthdate,
    reservations ? reservations.map(reservationMapper) : reservations
  );
}

module.exports = { fromDbToEntity, fromFormToEntity };
