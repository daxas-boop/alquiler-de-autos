class CarController {
  constructor(carService) {
    this.ROUTE = '/car';
    this.service = carService;
  }

  configureRoutes(app) {
    app.use(`${this.ROUTE}`, this.index.bind(this));
  }

  async index(req, res) {
    const cars = await this.service.getAll();
    res.render('car/views/index.njk', { cars });
  }
}

module.exports = CarController;
