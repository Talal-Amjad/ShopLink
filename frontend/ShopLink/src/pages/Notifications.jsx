// JSX (Notifications.jsx)
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Modal from "../components/Modal/Modal";
import { jwtDecode } from 'jwt-decode';

const Notifications = ({ onClose, isOpen }) => {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const username = decodedToken.username;

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationDelete = async (notificationID) => {
        try {
            await axios.delete(`/deleteNotification/${notificationID}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/shownotifications', {
                params: { username, role }
            });
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="right">
              <button onClick={onClose} className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            <div className="relative border border-gray-200 rounded-lg shadow-lg p-3">
                {notifications.length === 0 ? (
                    <p>No notifications so far.</p>
                ) : (
                    notifications.map((notification, index) => (
                        <div key={index} className="ml-3 overflow-hidden">
                            <p className="font-medium text-gray-900">{notification.title}</p>
                            <p className="max-w-xs text-sm text-gray-500">{notification.msg}</p>
                            <button onClick={() => handleNotificationDelete(notification.notificationID)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default Notifications;
