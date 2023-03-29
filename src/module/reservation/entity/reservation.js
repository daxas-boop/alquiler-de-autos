class Reservation {
  constructor({
    id,
    car,
    customer,
    carId,
    customerId,
    unitaryPrice,
    startDate,
    endDate,
    totalPrice,
    paymentMethod,
    isPaid,
  }) {
    this.id = id;
    this.carId = carId;
    this.customerId = customerId;
    this.car = car;
    this.customer = customer;
    this.unitaryPrice = unitaryPrice;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.isPaid = isPaid;
  }

  calculateDaysOfReservation() {
    const msDifference = this.endDate.getTime() - this.startDate.getTime();
    const totalDays = Math.ceil(msDifference / (1000 * 3600 * 24) + 1);
    return totalDays;
  }

  calculateTotalPrice() {
    const daysOfReservation = this.calculateDaysOfReservation();
    const totalPrice = this.unitaryPrice * daysOfReservation;
    return totalPrice;
  }
}

module.exports = Reservation;
