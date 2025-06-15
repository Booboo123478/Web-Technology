import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type RequireRoleProps = {
  allowedRoles: number[]; 
  userRole: number | null; 
};

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, userRole }) => {
  if (userRole === null) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default RequireRole;
