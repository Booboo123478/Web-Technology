import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type RequireRoleProps = {
  allowedRoles: number[]; 
  userRole: number | null; 
};

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, userRole }) => {
  if (userRole === null) {
    // pas connecté
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    // pas autorisé
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default RequireRole;
