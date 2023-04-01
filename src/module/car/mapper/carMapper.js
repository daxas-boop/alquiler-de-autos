const Car = require('../entity/car');

function fromFormToEntity({
  id,
  brand,
  model,
  'manufacture-year': manufactureYear,
  'kilometer-mileage': kilometerMileage,
  color,
  'has-air-conditioning': hasAirConditioning,
  passengers,
  transmission,
  'price-per-day': pricePerDay,
}) {
  return new Car(
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning === 'yes',
    passengers,
    transmission,
    pricePerDay
  );
}

function fromDbToEntity(
  {
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning,
    passengers,
    transmission,
    pricePerDay,
    image,
    reservations,
    deletedAt,
  },
  reservationMapper
) {
  return new Car(
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning,
    passengers,
    transmission,
    pricePerDay,
    image,
    reservations ? reservations.map(reservationMapper) : reservations,
    deletedAt
  );
}

module.exports = { fromDbToEntity, fromFormToEntity };
