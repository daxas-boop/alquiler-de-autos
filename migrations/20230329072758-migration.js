'use strict';

const CustomerModel = require('../src/module/customer/model/customerModel');
const CarModel = require('../src/module/car/model/carModel');
const ReservationModel = require('../src/module/reservation/model/reservationModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    CarModel.initialize(queryInterface.sequelize).sync({ force: true });
    CustomerModel.initialize(queryInterface.sequelize).sync({ force: true });
    ReservationModel.initialize(queryInterface.sequelize)
      .setupAssociations(CarModel, CustomerModel)
      .sync({ force: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('reservations');
  },
};
