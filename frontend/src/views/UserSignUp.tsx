import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSignUp from '../components/UserSignUp/UserSignUp';
import UserUploadPhoto from '../components/UserSignUp/UserUploadPhoto/UserUploadPhoto';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        
        {/* TODO: Handle all Users Components */}
        <Routes>
          <Route path="/signup1" element={<UserSignUp/>}/>
          <Route path="/signup2" element={<UserUploadPhoto/>}/>
        </Routes>

      </div>
    );
  }
}