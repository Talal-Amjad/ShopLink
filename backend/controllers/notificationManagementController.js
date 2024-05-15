// controller.js
const  Notifications = require('../models/notification.model')
const  BranchDetails  = require('../models/branchDetails.model');

const getUnreadNotificationCount = async (req, res) => {
    try {
        const { role, username } = req.query;

        let unreadCount = 0;

        if (role === 'owner') {
            unreadCount = await Notifications.count({
                where: { receiver: 'owner', status: 'unread' }
            });
        } else if (role === 'manager') {
            const managerBranch = await BranchDetails.findOne({
                where: { managerUsername: username }
            });

            if (managerBranch) {
                unreadCount = await Notifications.count({
                    where: { receiver: managerBranch.branchId, status: 'unread' }
                });
            }
        }

        res.status(200).json({ unreadCount });
    } catch (error) {
        console.error('Error fetching unread notification count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const markNotificationsAsRead = async (req, res) => {
    try {
        const { role, username } = req.query; 

        if (role === 'owner') {
            await Notifications.update(
                { status: 'read' },
                { where: { status: 'unread' } }
            );
        } else if (role === 'manager') {
            const managerBranch = await BranchDetails.findOne({
                where: { managerUsername: username }
            });

            if (managerBranch) {
                await Notifications.update(
                    { status: 'read' },
                    { where: { receiver: managerBranch.branchId, status: 'unread' } }
                );
            }
        }

        res.status(200).json({ message: 'Notifications marked as read successfully' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { notificationID } = req.params;
        await Notifications.destroy({
            where: {
                notificationID: notificationID
            }
        });
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUnreadNotificationCount, markNotificationsAsRead, deleteNotification };
