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
    transmission
  );
}

function fromDbToEntity({
  id,
  brand,
  model,
  manufactureYear,
  kilometerMileage,
  color,
  hasAirConditioning,
  passengers,
  transmission,
}) {
  return new Car(
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning,
    passengers,
    transmission
  );
}

module.exports = { fromDbToEntity, fromFormToEntity };
