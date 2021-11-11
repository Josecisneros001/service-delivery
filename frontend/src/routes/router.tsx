import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceProvider from '../views/ServiceProvider';
import Users from '../views/Users';
import UserSignUp from '../views/UserSignUp';
import SPSignUp from '../views/ServiceProviderSignUp'

const Router = () => (
  <Routes>
    {/* TODO: Handle all Views */}
    <Route path="service-provider/*" element={<ServiceProvider/>} />
    <Route path="users/*" element={<Users/>} />
    <Route path="users-signup/*" element={<UserSignUp/>} />
    <Route path="service-provider-signup/*" element={<SPSignUp/>} />
  </Routes>
);

export default Router;
