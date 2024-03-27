const { sequelize, DataTypes } = require('../config/dbConfig');

const Employee = sequelize.define("employee", {
    employeeID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          return 'ep' + Date.now();
        },
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branchId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },
});

sequelize.sync().then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create Employee table: ', error);
});

module.exports = { Employee };
