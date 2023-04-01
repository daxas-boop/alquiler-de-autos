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
          validate: {
            min: 1884,
            max: new Date().getFullYear(),
          },
        },
        kilometerMileage: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
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
          validate: {
            min: 1,
          },
        },
        pricePerDay: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        transmission: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['manual', 'automatic']],
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'car',
        underscored: true,
        initialAutoIncrement: 1,
        paranoid: true,
      }
    );
    return CarModel;
  }
}

module.exports = CarModel;
