const { sequelize, DataTypes } = require('../config/dbConfig');

const Notifications = sequelize.define("Notifications", {
    notificationID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          return 'N-' + Date.now();
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    msg : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status : {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
});

sequelize.sync().then(() => {
    console.log('Notifications table created successfully!');
}).catch((error) => {
    console.error('Unable to create Notifications table: ', error);
});

module.exports =  Notifications ;
