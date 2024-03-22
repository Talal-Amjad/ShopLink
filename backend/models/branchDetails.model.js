const { sequelize, DataTypes } = require('../config/dbConfig');


const BranchDetails=sequelize.define("BranchDetails",
  {
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        unique: true,
      },
    managerUsername: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }
);

sequelize.sync().then(() => {
    console.log('Branch Details table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = BranchDetails;

