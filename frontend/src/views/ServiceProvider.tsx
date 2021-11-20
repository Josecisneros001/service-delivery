import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ServiceProviders/ServiceProviderNavbar';
import CreateNewService from '../components/ServiceProviders/CreateNewService';
import Reservations from '../components/ServiceProviders/Reservations/Reservations';

export default class ServiceProvider extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Navbar />
        
        {/* TODO: Handle all ServiceProvider Components */}
        <Routes>
          <Route path="/create-service" element={<CreateNewService/>} />
          <Route path="/reservations" element={<Reservations/>} />
        </Routes>
      </div>
    );
  }
}
