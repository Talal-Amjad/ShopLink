const { sequelize, DataTypes } = require('../config/dbConfig');

const stock = sequelize.define("stock", {
    proID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          const uuid = require('uuid').v4;
          return 'P-' + uuid();
        }
      
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dosage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manufactureDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'valid',
    },
});

sequelize.sync().then(() => {
    console.log('Stock table created successfully!');
}).catch((error) => {
    console.error('Unable to create Stock table: ', error);
});

module.exports = { stock };