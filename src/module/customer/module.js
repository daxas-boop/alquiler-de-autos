const CustomerController = require('./controller/customerController');
const CustomerService = require('./service/customerService');
const CustomerRepository = require('./repository/customerRepository');

function initialize(app, container) {
  const customerController = container.get('CustomerController');
  customerController.configureRoutes(app);
}

module.exports = {
  initialize,
  CustomerController,
  CustomerService,
  CustomerRepository,
};
