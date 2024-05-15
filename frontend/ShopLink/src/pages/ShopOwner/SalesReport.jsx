import React, { useState, useEffect } from 'react';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import PowerBIEmbed from './../../components/PowerBI/powerbi';
const SalesReport = () => {
  
  return (
    <OwnerDashboardLayout>
        <div className="m-11">
      <PowerBIEmbed />
        </div>
    </OwnerDashboardLayout>
  );
};
  
export default SalesReport;

