const JobApplication  = require('../models/jobApplication.model');
const { JobVacancy } = require('../models/JobVacancy.model');

async function generateSkillsReport(req, res) {
    try {
        const jobApplications = await JobApplication.findAll();

        const report = [];

        for (const application of jobApplications) {
            let applicantSkills = [];
            if (typeof application.skills === 'string') {
                // Parse skills based on different formats
                applicantSkills = parseSkills(application.skills);
            } else {
                console.error(`Skills for application with ID ${application.id} are not in the expected format`);
                continue;
            }

            const jobVacancyID = application.jobVacancyID;

            const jobVacancy = await JobVacancy.findOne({ where: { jobVacancyID } });

            if (!jobVacancy) {
                console.error(`Job Vacancy not found for application with ID ${application.id}`);
                continue;
            }

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

// Function to parse skills based on different formats
function parseSkills(skillsString) {
    const skills = [];
    const lines = skillsString.split(/\r?\n/);
    lines.forEach(line => {
        const trimmedLine = line.trim();
        // Check if line contains digits followed by a period
        if (/^\d+\.\s/.test(trimmedLine)) {
            // Extract skill after removing the digits and period
            const skill = trimmedLine.replace(/^\d+\.\s/, '');
            skills.push(skill);
        } else if (trimmedLine.startsWith('Skills:')) {
            // Extract skills after removing the 'Skills:' prefix
            const skillsSubstring = trimmedLine.substring('Skills:'.length).trim();
            skills.push(...skillsSubstring.split(',').map(skill => skill.trim()));
        } else {
            // Assume single skill on this line
            skills.push(trimmedLine);
        }
    });
    return skills;
}

module.exports = { generateSkillsReport };
