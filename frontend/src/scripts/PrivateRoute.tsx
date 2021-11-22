import React from 'react';
import { Navigate } from 'react-router';
import { isAuth } from './APIs';

export default function PrivateRoute({ children, redirectTo, is_service_provider }: { children: JSX.Element, redirectTo: string, is_service_provider: boolean }) {
    return children;
  if(isAuth(is_service_provider)) {
      return children;
    } else {
      return <Navigate to={redirectTo} />;
    }
};
