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
    const id = req.params.id;
    const car = await this.service.getById(id);
    res.render('car/views/delete.njk', { car });
  }

  async edit(req, res) {
    const id = req.params.id;
    const car = await this.service.getById(id);
    res.render('car/views/edit.njk', { car });
  }

  async view(req, res) {
    const id = req.params.id;
    const car = await this.service.getById(id);
    res.render('car/views/view.njk', { car });
  }

  async save(req, res) {
    const car = fromFormToEntity(req.body);
    const newCar = await this.service.save(car);
    res.redirect('/car/view/' + newCar.id);
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.service.delete(id);
    res.redirect('/car');
  }
}

module.exports = CarController;
