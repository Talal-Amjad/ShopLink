const JobApplication  = require('../models/jobApplication.model');

async function hiringreport(req, res) {
    try {
        // Total number of applications
        const totalApplications = await JobApplication.count();

        // Selected Candidates
        const selectedCandidates = await JobApplication.count({ where: { status: 'selected' } });

        // Rejected Candidates
        const rejectedCandidates = await JobApplication.count({ where: { status: 'rejected' } });

        // Pending Applications
        const pendingApplications = await JobApplication.count({ where: { status: 'pending' } });

        res.json({
            totalApplications,
            selectedCandidates,
            rejectedCandidates,
            pendingApplications
        });
    } catch (error) {
        console.error("Error getting application status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { hiringreport };
