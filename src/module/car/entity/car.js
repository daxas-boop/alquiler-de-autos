class Car {
  constructor(
    id,
    brand,
    model,
    manufactureYear,
    kilometerMileage,
    color,
    hasAirConditioning,
    passengers,
    transmission
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.manufactureYear = manufactureYear;
    this.kilometerMileage = kilometerMileage;
    this.color = color;
    this.hasAirConditioning = hasAirConditioning;
    this.passengers = passengers;
    this.transmission = transmission;
  }
}

module.exports = Car;
