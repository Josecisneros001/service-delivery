import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLogin from '../components/UserLogin/UserLogin';
import UserSignUp from '../components/UserSignUp/UserSignUp';
import UserUploadPhoto from '../components/UserSignUp/UserUploadPhoto/UserUploadPhoto';
import PrivateRoute from '../scripts/PrivateRoute';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/signup" element={<UserSignUp/>}/>
          <Route
            path="/upload-photos"
            element={<PrivateRoute redirectTo="login"><UserUploadPhoto/></PrivateRoute>}
          />
          {/* TODO: Change * to Home View */}
          <Route
            path="*"
            element={<PrivateRoute redirectTo="login"><UserUploadPhoto/></PrivateRoute>}
          />
        </Routes>
      </div>
    );
  }
}
