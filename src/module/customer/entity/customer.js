class Customer {
  constructor(
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
    reservations
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.nationality = nationality;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.birthdate = birthdate;
    this.reservations = reservations;
  }
}

module.exports = Customer;
