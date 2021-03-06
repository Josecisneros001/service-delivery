import React from 'react';
import { Navigate } from 'react-router';
import { isAuth } from './APIs';

export default function PrivateRoute({ children, redirectTo, is_service_provider, ...props }: { children: JSX.Element, redirectTo: string, is_service_provider: boolean }) {
    if(isAuth(is_service_provider)) {
      return React.cloneElement(children, props);
    } else {
      return <Navigate to={redirectTo} />;
    }
};
