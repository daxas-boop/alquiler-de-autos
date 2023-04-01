'use strict';

const CustomerModel = require('../src/module/customer/model/customerModel');
const CarModel = require('../src/module/car/model/carModel');
const ReservationModel = require('../src/module/reservation/model/reservationModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    CarModel.initialize(queryInterface.sequelize)
      .sync({ force: true })
      .then(() => {
        CarModel.bulkCreate([
          {
            brand: 'Toyota',
            model: 'Corolla',
            manufactureYear: 2023,
            kilometerMileage: 0,
            color: 'Red',
            passengers: 4,
            pricePerDay: 200,
            transmission: 'manual',
            hasAirConditioning: true,
            image: 'https://cdn.motor1.com/images/mgl/AkkXwL/s1/toyota-corolla-2023.webp',
          },
          {
            brand: 'Tesal',
            model: 'Model 3',
            manufactureYear: 2023,
            kilometerMileage: 0,
            color: 'Red',
            passengers: 4,
            pricePerDay: 500,
            transmission: 'automatic',
            hasAirConditioning: true,
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ydray-kan1319-1625307860.jpg',
          },
        ]);
      });
    CustomerModel.initialize(queryInterface.sequelize)
      .sync({ force: true })
      .then(() => {
        CustomerModel.bulkCreate([
          {
            name: 'Juan',
            surname: 'Gonzalez',
            documentType: 'DNI',
            documentNumber: 445325754,
            nationality: 'Argentino',
            address: 'Ramon Cabrero y Esquiu',
            phone: '4444-4444',
            email: 'juan@gonzalez.com',
            birthdate: new Date(1995, 2, 17),
          },
        ]);
      });
    ReservationModel.initialize(queryInterface.sequelize)
      .setupAssociations(CarModel, CustomerModel)
      .sync({ force: true })
      .then(() => {
        ReservationModel.create({
          customerId: 1,
          carId: 1,
          startDate: new Date(2022, 3, 25),
          endDate: new Date(2022, 3, 30),
          unitaryPrice: 200,
          totalPrice: 1200,
          paymentMethod: 'cash',
          isPaid: false,
        });
      });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('reservations');
  },
};
