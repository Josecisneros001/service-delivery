import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ServiceProvider from '../views/ServiceProvider';
import Users from '../views/Users';

const Router = () => (
  <Routes>
    {/* TODO: Handle all Views */}
    <Route path="service-providers/*" element={<ServiceProvider/>} />
    <Route path="users/*" element={<Users/>} />
    <Route
      path="*"
      element={<Navigate to="users/" />}
    />
  </Routes>
);

export default Router;
