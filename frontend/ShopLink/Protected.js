import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


function Protected({ component: Component,allowableuser }) {
  console.log('I am in protected.js');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log('User Role:', userRole);
      console.log("allowable",allowableuser)
      if(userRole!=allowableuser){
           localStorage.removeItem("token");
           navigate("/signin/")
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/signin');
    }
  }, [navigate]);

  return Component ;
}

export default Protected;
