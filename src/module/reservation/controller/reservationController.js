const NotEnoughCarsError = require('../error/NotEnoughCarsError');
const NotEnoughCustomersError = require('../error/NotEnoughCustomersError');
const { fromFormToEntity } = require('../mapper/reservationMapper');

class ReservationController {
  constructor(reservationService, carService, customerService) {
    this.ROUTE = '/reservation';
    this.reservationService = reservationService;
    this.carService = carService;
    this.customerService = customerService;
  }

  configureRoutes(app) {
    app.get(`${this.ROUTE}`, this.viewAll.bind(this));
    app.get(`${this.ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${this.ROUTE}/create`, this.create.bind(this));
    app.get(`${this.ROUTE}/edit/:id`, this.edit.bind(this));
    app.post(`${this.ROUTE}/save`, this.save.bind(this));
  }

  async viewAll(req, res) {
    const reservations = await this.reservationService.getAll();
    res.render('reservation/views/view-all.njk', { reservations });
  }

  async create(req, res) {
    try {
      const cars = await this.carService.getAll();
      const customers = await this.customerService.getAll();
      if (cars.length === 0) {
        throw new NotEnoughCarsError('You need at least one car to create a reservation');
      }
      if (customers.length === 0) {
        throw new NotEnoughCustomersError('You need at least one customer to create a reservation');
      }
      res.render('reservation/views/create.njk', { cars, customers });
    } catch (e) {
      res.render('reservation/views/error.njk', { error: e.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const reservation = await this.reservationService.getById(id);
      const cars = await this.carService.getAll();
      const customers = await this.customerService.getAll();
      res.render('reservation/views/edit.njk', { reservation, cars, customers });
    } catch (e) {
      res.render('reservation/views/error.njk', { error: e.message });
    }
  }

  async view(req, res) {
    try {
      const id = req.params.id;
      const reservation = await this.reservationService.getById(id);
      res.render('reservation/views/view.njk', { reservation });
    } catch (e) {
      res.render('reservation/views/error.njk', { error: e.message });
    }
  }

  async save(req, res) {
    try {
      const reservation = fromFormToEntity(req.body);
      reservation.car = await this.carService.getById(reservation.carId);
      reservation.customer = await this.customerService.getById(reservation.customerId);
      const newReservation = await this.reservationService.save(reservation);
      res.redirect('/reservation/view/' + newReservation.id);
    } catch (e) {
      res.render('reservation/views/error.njk', { error: e.message });
    }
  }
}

module.exports = ReservationController;
