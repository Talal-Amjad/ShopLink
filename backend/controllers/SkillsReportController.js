const JobApplication  = require('../models/jobApplication.model');
const { JobVacancy } = require('../models/JobVacancy.model');
const BranchDetails = require('../models/branchDetails.model');

async function generateSkillsReport(req, res) {
    try {
        const { username, status } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });
    let applicants;
    
    if (status && status !== 'All') {
      applicants = await JobApplication.findAll({
        where: { branchId: managerBranch.branchId, status }
      });
    } else {
      applicants = await JobApplication.findAll({
        where: { branchId: managerBranch.branchId }
      });
    }


        const report = [];

        for (const application of applicants) {
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
                score,
                jobTitle: jobVacancy.jobTitle, // Access jobTitle from jobVacancy
                status: application.status // Access status directly from application
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


function parseSkills(skillsString) {
    const skills = [];
    const lines = skillsString.split(/\r?\n/);
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (/^\d+\.\s/.test(trimmedLine)) {
            const skill = trimmedLine.replace(/^\d+\.\s/, '');
            skills.push(skill);
        } else if (trimmedLine.startsWith('Skills:')) {
            const skillsSubstring = trimmedLine.substring('Skills:'.length).trim();
            skills.push(...skillsSubstring.split(',').map(skill => skill.trim()));
        } else {
            skills.push(trimmedLine);
        }
    });
    return skills;
}

module.exports = { generateSkillsReport };
