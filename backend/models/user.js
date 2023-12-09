const { sequelize, DataTypes } = require('../config/dbConfig');


const User=sequelize.define("user",
  {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    username: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      unique: true,
    },
    email: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
        unique: true,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'owner', 'manager'),
      allowNull: false,
      defaultValue: 'owner',
    },
    verificationCode: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }
);

sequelize.sync().then(() => {
    console.log('userCredentials table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = User;

