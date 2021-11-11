import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceProviderSignUp from '../components/ServiceProviderSignUp/SignUp';
import ServiceProviderUpload from '../components/ServiceProviderSignUp/SPUploadPhoto/SPUploadPhoto';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        
        {/* TODO: Handle all Users Components */}
        <Routes>
          <Route path="/signup1" element={<ServiceProviderSignUp/>}/>
          <Route path="/signup2" element={<ServiceProviderUpload/>}/>
        </Routes>

      </div>
    );
  }
}