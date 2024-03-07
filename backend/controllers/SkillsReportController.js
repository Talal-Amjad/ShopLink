// controllers/skillsReportController.js
const JobApplication  = require('../models/jobApplication.model');
const { JobVacancy } = require('../models/JobVacancy.model');

async function generateSkillsReport(req, res) {
    try {
        // Fetch all job applications
        const jobApplications = await JobApplication.findAll();

        // Initialize result array
        const report = [];

        // Iterate through each job application
        for (const application of jobApplications) {
            const jobVacancyID = application.jobVacancyID;

            // Fetch job vacancy details for the application
            const jobVacancy = await JobVacancy.findOne({ where: { jobVacancyID } });

            if (!jobVacancy) {
                console.error(`Job Vacancy not found for application with ID ${application.id}`);
                continue; // Skip this application if job vacancy not found
            }

            const applicantSkills = application.skills.split(',').map(skill => skill.trim());
            const jobSkills = JSON.parse(jobVacancy.skills); // Parse JSON string to array

            // Calculate matching skills
            const matchedSkills = applicantSkills.filter(skill => jobSkills.includes(skill));
            const missedSkills = jobSkills.filter(skill => !applicantSkills.includes(skill));

            // Calculate score
            const score = (matchedSkills.length / jobSkills.length) * 100;

            // Construct applicant report
            const applicantReport = {
                username: application.username,
                matchedSkills,
                missedSkills,
                score
            };

            report.push(applicantReport);
        }

        // Send response
        res.json(report);
    } catch (error) {
        console.error("Error generating skills report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { generateSkillsReport };
