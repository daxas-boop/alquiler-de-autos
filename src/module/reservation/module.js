const ReservationController = require('./controller/reservationController');
const ReservationService = require('./service/reservationService');
const ReservationRepository = require('./repository/reservationRepository');

function initialize(app, container) {
  const reservationController = container.get('ReservationController');
  reservationController.configureRoutes(app);
}

module.exports = {
  initialize,
  ReservationController,
  ReservationService,
  ReservationRepository,
};
