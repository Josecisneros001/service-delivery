import React from 'react';
import { Navigate } from 'react-router';
import { isAuth } from './APIs';

export default function PrivateRoute({ children, redirectTo }: { children: JSX.Element, redirectTo: string }) {
    if(isAuth()) {
      return children;
    } else {
      return <Navigate to={redirectTo} />;
    }
};
