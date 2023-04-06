const { DataTypes, Model } = require('sequelize');

class ReservationModel extends Model {
  static initialize(sequelize) {
    ReservationModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
          allowNull: false,
        },
        unitaryPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['cash', 'card']],
          },
        },
        isPaid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'reservation',
        underscored: true,
        validate: {
          startDateBeforeEndDate() {
            if (this.startDate > this.endDate) {
              throw new Error('Start date cannot be older than the end date');
            }
          },
        },
      }
    );
    return ReservationModel;
  }

  static setupAssociations(carModel, customerModel) {
    carModel.hasMany(ReservationModel, { foreignKey: 'carId', constraints: false });
    customerModel.hasMany(ReservationModel, { foreignKey: 'customerId', constraints: false });
    ReservationModel.belongsTo(carModel, { foreignKey: 'carId', constraints: false });
    ReservationModel.belongsTo(customerModel, { foreignKey: 'customerId', constraints: false });
    return ReservationModel;
  }
}

module.exports = ReservationModel;
