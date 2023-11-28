const { sequelize, DataTypes } = require('../config/dbConfig');

const JobApplication = sequelize.define("JobApplication", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    applythrough: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: true,
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

    }
});

sequelize.sync().then(() => {
    console.log('JobApplication table created successfully!');
}).catch((error) => {
    console.error('Unable to create Job Application table: ', error);
});

module.exports = JobApplication;
