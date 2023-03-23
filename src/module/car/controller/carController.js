const { fromFormToEntity } = require('../mapper/carMapper');
class CarController {
  constructor(carService) {
    this.ROUTE = '/car';
    this.service = carService;
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
    const cars = await this.service.getAll();
    res.render('car/views/index.njk', { cars });
  }

  create(req, res) {
    res.render('car/views/create.njk');
  }

  async confirmDelete(req, res) {
    try {
      const id = req.params.id;
      const car = await this.service.getById(id);
      res.render('car/views/delete.njk', { id: car.id });
    } catch (e) {
      res.render('car/views/error.njk', { error: e.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const car = await this.service.getById(id);
      res.render('car/views/edit.njk', { car });
    } catch (e) {
      res.render('car/views/error.njk', { error: e.message });
    }
  }

  async view(req, res) {
    try {
      const id = req.params.id;
      const car = await this.service.getById(id);
      res.render('car/views/view.njk', { car });
    } catch (e) {
      res.render('car/views/error.njk', { error: e.message });
    }
  }

  async save(req, res) {
    try {
      const car = fromFormToEntity(req.body);
      const newCar = await this.service.save(car);
      res.redirect('/car/view/' + newCar.id);
    } catch (e) {
      res.render('car/views/error.njk', { error: e.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await this.service.delete(id);
      res.redirect('/car');
    } catch (e) {
      res.render('car/views/error.njk', { error: e.message });
    }
  }
}

module.exports = CarController;
