import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import MyServices from '../components/ServiceProviders/MyServices/MyServices';
import Reservations from '../components/ServiceProviders/Reservations/Reservations';
import ServiceProviderHomePage from '../components/ServiceProviders/HomePage/ServiceProviderHomePage';
import SignUp from '../components/SignUp/SignUp';
import UploadFilesForm from '../components/SignUp/UploadFilesForm/UploadFilesForm';
import PrivateRoute from '../scripts/PrivateRoute';

export default class ServiceProvider extends Component {  
  public render() { 
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login is_service_provider={true}/>}/>
          <Route path="/signup" element={<SignUp is_service_provider={true}/>}/>
          <Route
            path="/upload-files"
            element={<PrivateRoute is_service_provider={true} redirectTo="login"><UploadFilesForm is_service_provider={true}/></PrivateRoute>}
          />
          <Route
            path="/my-services"
            element={<PrivateRoute is_service_provider={true} redirectTo="login"><MyServices/></PrivateRoute>}
          />
          <Route
            path="/reservations"
            element={<PrivateRoute is_service_provider={true} redirectTo="login"><Reservations/></PrivateRoute>}
          />
          <Route
            path="/"
            element={<PrivateRoute is_service_provider={true} redirectTo="login"><ServiceProviderHomePage/></PrivateRoute>}
          />
          <Route
            path="*"
            element={<PrivateRoute is_service_provider={true} redirectTo="login"><ServiceProviderHomePage/></PrivateRoute>}
          />
        </Routes>
      </div>
    );
  }
}
