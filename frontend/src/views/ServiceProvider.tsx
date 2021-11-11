import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ServiceProviders/ServiceProviderNavbar';
import CreateNewService from '../components/ServiceProviders/CreateNewService';
import ServiceProviderHomePage from '../components/ServiceProviders/HomePage/ServiceProviderHomePage';
import ServiceProviderEditProfile from '../components/ServiceProviders/EditProfile/ServiceProviderEditProfile';

export default class ServiceProvider extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Navbar />
        
        {/* TODO: Handle all ServiceProvider Components */}
        <Routes>
          <Route path="/create-service" element={<CreateNewService/>} />
          <Route path="/homepage" element={<ServiceProviderHomePage/>} />
          <Route path="/edit-profile" element={<ServiceProviderEditProfile/>} />
        </Routes>
      </div>
    );
  }
}
