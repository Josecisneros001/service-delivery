import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceProvider from '../views/ServiceProvider';
import Users from '../views/Users';

const Router = () => (
  <Routes>
    {/* TODO: Handle all Views */}
    <Route path="service-provider/*" element={<ServiceProvider/>} />
    <Route path="users/*" element={<Users/>} />
  </Routes>
);

export default Router;
