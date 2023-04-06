require('dotenv').config();
const express = require('express');
const configureDI = require('./config/di');
const nunjucks = require('nunjucks');
const { initialize: initializeCarModule } = require('./module/car/module');
const { initialize: initializeCustomerModule } = require('./module/customer/module');
const { initialize: initializeReservationModule } = require('./module/reservation/module');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'njk');
nunjucks.configure('./src/module', {
  autoescape: true,
  express: app,
});

const container = configureDI();
initializeCarModule(app, container);
initializeCustomerModule(app, container);
initializeReservationModule(app, container);

const reservationController = container.get('ReservationController');
app.get('/', reservationController.viewAll.bind(reservationController));

app.use((err, req, res, next) => {
  res.status(500).render('views/error.njk', { error: err.message });
});

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
