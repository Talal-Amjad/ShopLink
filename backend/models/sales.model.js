const { sequelize, DataTypes } = require('../config/dbConfig');

const sale = sequelize.define("sales", {
    saleId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          const uuid = require('uuid').v4;
          return 'Sales-' + uuid();
        }
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salesDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

sequelize.sync().then(() => {
    console.log('sales table created successfully!');
}).catch((error) => {
    console.error('Unable to create sales table: ', error);
});

module.exports = { sale };