const JobApplication  = require('../models/jobApplication.model');

async function hiringreport(req, res) {
    try {

        const { branchId } = req.query;
        let totalApplications ;

        // Selected Candidates
        let selectedCandidates ;
        // Rejected Candidates
        let rejectedCandidates ;
        // Pending Applications
        let pendingApplications ;  
  
    if ((req.query.branchId && req.query.branchId !== 'All')) {
        // Total number of applications
         totalApplications = await JobApplication.count({ where: { branchId: branchId } });

        // Selected Candidates
         selectedCandidates = await JobApplication.count({ where: { status: 'selected'  , branchId: branchId  }});

        // Rejected Candidates
         rejectedCandidates = await JobApplication.count({ where: { status: 'rejected' , branchId: branchId  }});

        // Pending Applications
         pendingApplications = await JobApplication.count({ where: { status: 'pending' , branchId: branchId  }});
    }
    else{

        // Total number of applications
        totalApplications = await JobApplication.count();

        // Selected Candidates
         selectedCandidates = await JobApplication.count({ where: { status: 'selected' } });

        // Rejected Candidates
         rejectedCandidates = await JobApplication.count({ where: { status: 'rejected' } });

        // Pending Applications
         pendingApplications = await JobApplication.count({ where: { status: 'pending' } });

    }

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
