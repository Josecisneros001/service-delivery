import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLogin from '../components/UserLogin/UserLogin';
import Navbar from '../components/Users/UsersNavbar';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        
        {/* TODO: Handle all Users Components */}
        <Routes>
          <Route path="/login" element={<UserLogin/>} />
        </Routes>

      </div>
    );
  }
}
