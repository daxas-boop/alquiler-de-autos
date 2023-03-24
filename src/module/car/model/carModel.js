const { DataTypes, Model } = require('sequelize');

class CarModel extends Model {
  static initialize(sequelize) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        manufactureYear: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kilometerMileage: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hasAirConditioning: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        passengers: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transmission: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'car',
        underscored: true,
        initialAutoIncrement: 1,
      }
    );
    return CarModel;
  }
}

module.exports = { CarModel };
