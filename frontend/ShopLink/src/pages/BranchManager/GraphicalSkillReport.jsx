import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import axios from "../../axios";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

const GraphicalSkillReport = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const username = decodedToken.username;


    useEffect(() => {
        fetchSkillsReport();
    }, []);

    const fetchSkillsReport = async () => {
        try {
            const response = await axios.get("/skillsreport", {
                params: {
                    username,role,
                    status: 'All'
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching skills report:", error);
        }
    };

    return (
      <ManagerDashboardLayout>
        <div className="mt-14">
            <h1 className="mb-4 text-3xl font-bold">Skills Report</h1>
            <BarChart width={800} height={600} data={data} className="m-auto">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
        </div>
        </ManagerDashboardLayout>
    );
};

export default GraphicalSkillReport;
