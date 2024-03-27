const Notifications = require('../models/notification.model');
const BranchDetails=require('../models/branchDetails.model');
const User = require('../models/user'); // Assuming you have a User model
const { sendJobNotificationEmail } = require('../config/transporter');


const  saveJobNotificaton = async (req, res) => {
    try {
        const { jobVacancyID, branchId, title, status } = req.body;

        let msg;
        if (title === 'Job Approved') {
            msg = `Your job (${jobVacancyID}) against id (${branchId}) has been approved on date (${new Date().toDateString()}) at (${new Date().toLocaleTimeString()}).`;
        } else if (title === 'Job Rejected') {
            msg = `Your job (${jobVacancyID}) against id (${branchId}) has been rejected on date (${new Date().toDateString()}) at (${new Date().toLocaleTimeString()}).`;
        }

        // Save notification to database
        const notification = await Notifications.create({
            title,
            sender: 'owner',
            receiver: branchId,
            msg,
            status: 'unread'
        });

        // Retrieve username from BranchDetails table
        const branch = await BranchDetails.findOne({ where: { branchId } });
        const username = branch.managerUsername;

        // Retrieve email from User table using the username
        const user = await User.findOne({ where: { username } });
        const email = user.email;

        // Send email notification
        await sendJobNotificationEmail(email, title, msg);

        res.status(201).json({ message: 'Notification sent successfully!', notification });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const fetchNotifications = async (req, res) => {
    try {
        const { role, username } = req.query; // Extracting username and role from query parameters
        
        let notifications;

        // If user is an owner
        if (role === 'owner') {
            notifications = await Notifications.findAll({
                where: {
                    receiver: 'owner' // Filter notifications where receiver is owner
                }
            });
        }
        // If user is a manager
        else if (role === 'manager') {
            // Fetch branch ID for the manager
            const managerBranch = await BranchDetails.findOne({
                where: {
                    managerUsername: username // Using username to find the manager's branch
                }
            });

            if (managerBranch) {
                notifications = await Notifications.findAll({
                    where: {
                        receiver: managerBranch.branchId // Filter notifications where receiver is manager's branch ID
                    }
                });
            }
        }

        res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const savePostJobNotificaton = async (req, res) => {
    try {
        const { jobTitle, username, title, status } = req.body;
        const managerBranch = await BranchDetails.findOne({
            where: {
                managerUsername: username // Using username to find the manager's branch
            }
        });

        let msg;
        msg = `New Job Posted at branch with code ${managerBranch.branchId} against Title- ${jobTitle} on date ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}.`;

        // Create notification
        const notification = await Notifications.create({
            title,
            sender: managerBranch.branchId,
            receiver: 'owner',
            msg,
            status: 'unread'
        });

        // Retrieve email of the owner
        const owner = await User.findOne({ where: { role: 'owner' } });
        const ownerEmail = owner.email;

        // Send email notification to the owner
        await sendJobNotificationEmail(ownerEmail, `New Job Posted - ${jobTitle}`, msg);

        res.status(201).json({ message: 'Notification sent successfully!', notification });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { saveJobNotificaton, fetchNotifications, savePostJobNotificaton };
