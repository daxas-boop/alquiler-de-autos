const Customer = require('../entity/customer');
const CustomerIdNotDefinedError = require('../error/CustomerIdNotDefinedError');
const CustomerNotDefinedError = require('../error/CustomerNotDefinedError');

class CustomerService {
  constructor(customerRepository) {
    this.repository = customerRepository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new CustomerIdNotDefinedError();
    }

    return this.repository.getById(id);
  }

  async save(customer) {
    if (!(customer instanceof Customer)) {
      throw new CustomerNotDefinedError();
    }

    return this.repository.save(customer);
  }

  async delete(id) {
    if (id === undefined) {
      throw new CustomerIdNotDefinedError();
    }

    return this.repository.delete(id);
  }
}

module.exports = CustomerService;
