import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios';
import Swal from 'sweetalert2';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';

export default function HiringProcessReport() {
    const [reportData, setReportData] = useState({
        totalApplications: 0,
        selectedCandidates: 0,
        rejectedCandidates: 0,
        pendingApplications: 0
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/hiringreport');
                setReportData(response.data);
            } catch (error) {
                console.error('Error fetching hiring report:', error);
                // Handle error, show error message, etc.
            }
        }

        fetchData();
    }, []);

    return (
        <OwnerDashboardLayout>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Hiring Process Report</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                </path>
                            </svg>
                        </div>
                        <div className="px-4 py-2 text-gray-700">
                            <h1 className="text-xl">Selected Candidates</h1>
                            <p className="text-3xl">{reportData.selectedCandidates}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                                </path>
                            </svg>
                        </div>
                        <div className="px-4 py-2 text-gray-700">
                            <h3 className="text-xl">Total Applications</h3>
                            <p className="text-3xl">{reportData.totalApplications}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                                </path>
                            </svg>
                        </div>
                        <div className="px-4 py-2 text-gray-700">
                            <h3 className="text-xl">Pending Applications</h3>
                            <p className="text-3xl">{reportData.pendingApplications}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                </path>
                            </svg>
                        </div>
                        <div className="px-4 py-2 text-gray-700">
                            <h3 className="text-xl">Rejected Candidate</h3>
                            <p className="text-3xl">{reportData.rejectedCandidates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </OwnerDashboardLayout>
    );
}
