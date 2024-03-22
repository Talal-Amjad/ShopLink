const { sequelize, DataTypes } = require('../config/dbConfig');

const JobApplication = sequelize.define("JobApplication", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skills: {
        type: DataTypes.JSON,
      },
    status: {
        type: DataTypes.STRING,
        allowNull: false

    },
    jobVacancyID: {
        type: DataTypes.STRING,
        allowNull: false

    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false

    },
    branchId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },
});

sequelize.sync().then(() => {
    console.log('JobApplication table created successfully!');
}).catch((error) => {
    console.error('Unable to create Job Application table: ', error);
});

module.exports = JobApplication;
