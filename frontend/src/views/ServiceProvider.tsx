import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateNewService from '../components/ServiceProviders/CreateNewService';
import Reservations from '../components/ServiceProviders/Reservations/Reservations';
import ServiceProviderSignUp from '../components/ServiceProviderSignUp/SignUp';
import ServiceProviderUpload from '../components/ServiceProviderSignUp/SPUploadPhoto/SPUploadPhoto';
import PrivateRoute from '../scripts/PrivateRoute';

export default class ServiceProvider extends Component {  
  public render() {
    return (
      <div className="h-screen">
        <Routes>
          <Route
            path="/create-service"
            element={<PrivateRoute redirectTo="login"><CreateNewService/></PrivateRoute>}
          />
          <Route
            path="/reservations"
            element={<PrivateRoute redirectTo="login"><Reservations/></PrivateRoute>}
          />
          <Route path="/signup" element={<ServiceProviderSignUp/>}/>
          <Route path="/upload-photos" element={<ServiceProviderUpload/>}/>
          {/* TODO: Change * to Home View */}
          <Route
            path="*"
            element={<PrivateRoute redirectTo="login"><Reservations/></PrivateRoute>}
          />
        </Routes>
      </div>
    );
  }
}
