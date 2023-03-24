const { fromFormToEntity } = require('../mapper/customerMapper');

class CustomerController {
  constructor(customerService) {
    this.ROUTE = '/customer';
    this.service = customerService;
  }

  configureRoutes(app) {
    app.get(`${this.ROUTE}`, this.index.bind(this));
    app.get(`${this.ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${this.ROUTE}/create`, this.create.bind(this));
    app.get(`${this.ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.confirmDelete.bind(this));
    app.post(`${this.ROUTE}/save`, this.save.bind(this));
    app.post(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
  }

  async index(req, res) {
    const customers = await this.service.getAll();
    res.render('customer/views/index.njk', { customers });
  }

  create(req, res) {
    res.render('customer/views/create.njk');
  }

  async confirmDelete(req, res) {
    try {
      const id = req.params.id;
      const customer = await this.service.getById(id);
      res.render('customer/views/delete.njk', { id: customer.id });
    } catch (e) {
      res.render('customer/views/error.njk', { error: e.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const customer = await this.service.getById(id);
      res.render('customer/views/edit.njk', { customer });
    } catch (e) {
      res.render('customer/views/error.njk', { error: e.message });
    }
  }

  async view(req, res) {
    try {
      const id = req.params.id;
      const customer = await this.service.getById(id);
      res.render('customer/views/view.njk', { customer });
    } catch (e) {
      res.render('customer/views/error.njk', { error: e.message });
    }
  }

  async save(req, res) {
    try {
      const customer = fromFormToEntity(req.body);
      const newCustomer = await this.service.save(customer);
      res.redirect('/customer/view/' + newCustomer.id);
    } catch (e) {
      res.render('customer/views/error.njk', { error: e.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await this.service.delete(id);
      res.redirect('/customer');
    } catch (e) {
      res.render('customer/views/error.njk', { error: e.message });
    }
  }
}

module.exports = CustomerController;
