const Car = require('../entity/car');

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
  return new Car({
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning,
    passengers,
    transmission,
  });
}

module.exports = fromDbToEntity;
