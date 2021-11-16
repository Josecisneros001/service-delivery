import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ServiceProviders/ServiceProviderNavbar';
import CreateNewService from '../components/ServiceProviders/CreateNewService';
import Test from '../components/ServiceProviders/Cards/Cards';

export default class ServiceProvider extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Navbar />
        
        {/* TODO: Handle all ServiceProvider Components */}
        <Routes>
          <Route path="/create-service" element={<CreateNewService/>} />
          <Route path="/card" element={<Test/>} />
        </Routes>
      </div>
    );
  }
}
