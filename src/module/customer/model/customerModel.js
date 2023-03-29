const { DataTypes, Model } = require('sequelize');

class CustomerModel extends Model {
  static initialize(sequelize) {
    CustomerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        documentType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        documentNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthdate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            max: new Date().toISOString().split('T')[0],
          },
        },
      },
      {
        sequelize,
        modelName: 'customer',
        underscored: true,
      }
    );
    return CustomerModel;
  }
}

module.exports = { CustomerModel };
