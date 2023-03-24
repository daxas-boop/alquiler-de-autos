const { fromDbToEntity } = require('../mapper/customerMapper');
const CustomerNotFoundError = require('../error/CustomerNotFoundError');
const CustomerIdNotDefinedError = require('../error/CustomerIdNotDefinedError');
const Customer = require('../entity/customer');
const CustomerNotDefinedError = require('../error/CustomerNotDefinedError');

class CustomerRepository {
  constructor(CustomerModel) {
    this.CustomerModel = CustomerModel;
  }

  async getAll() {
    const customers = await this.CustomerModel.findAll();
    return customers.map((customer) => fromDbToEntity(customer));
  }

  async getById(id) {
    if (id === undefined) {
      throw new CustomerIdNotDefinedError();
    }
    const customer = await this.CustomerModel.findByPk(id);
    if (!customer) {
      throw new CustomerNotFoundError();
    }
    return fromDbToEntity(customer.dataValues);
  }

  async save(customer) {
    if (!(customer instanceof Customer)) {
      throw new CustomerNotDefinedError();
    }
    const build = await this.CustomerModel.build(customer, { isNewRecord: !customer.id });
    await build.save();

    return this.getById(build.id);
  }

  async delete(id) {
    if (id === undefined) {
      throw new CustomerIdNotDefinedError();
    }

    return !!(await this.CustomerModel.destroy({ where: { id } }));
  }
}

module.exports = CustomerRepository;
