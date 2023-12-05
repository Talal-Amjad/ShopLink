const { sequelize, DataTypes } = require('../config/dbConfig');

const JobVacancy = sequelize.define("JobVacancy", {
    jobVacancyID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    jobTitle: {  
        type: DataTypes.STRING,
        allowNull: false,  
    },
    expectedSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
    jobDiscription: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    lastDate: {
        type: DataTypes.DATE,
        allowNull: false,  
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

sequelize.sync().then(() => {
    console.log('Job Vacancy table created successfully!');
}).catch((error) => {
    console.error('Unable to create Job Vacancy table: ', error);
});

module.exports = JobVacancy;
