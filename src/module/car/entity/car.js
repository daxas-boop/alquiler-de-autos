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
    transmission,
    pricePerDay,
    image
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
    this.pricePerDay = pricePerDay;
    this.image = image;
  }
}

module.exports = Car;
