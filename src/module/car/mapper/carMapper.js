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
    hasAirConditioning,
    passengers,
    transmission
  );
}

function fromDbToEntity({
  id,
  brand,
  model,
  manufacture_year: manufactureYear,
  kilometer_mileage: kilometerMileage,
  color,
  has_air_conditioning: hasAirConditioning,
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
