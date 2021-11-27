import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import PrivateRoute from '../scripts/PrivateRoute';
import UploadFilesForm from '../components/SignUp/UploadFilesForm/UploadFilesForm';
import EditProfile from '../components/ServiceProviders/EditProfile/EditProfile';
import Chats from '../components/Chats/Chats';
import RequestPage from '../components/Users/RequestPage';
import UserHomePage from '../components/Users/UserHomePage/UserHomePage';
import MyReservations from '../components/Users/MyReservations/MyReservations';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login is_service_provider={false}/>}/>
          <Route path="/signup" element={<SignUp is_service_provider={false}/>}/>
          <Route
            path="/edit-profile"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><EditProfile is_service_provider={false}/></PrivateRoute>}
          />
          <Route
            path="/upload-files"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><UploadFilesForm is_service_provider={false}/></PrivateRoute>}
          />
          <Route
            path="/chats"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><Chats is_service_provider={false}/></PrivateRoute>}
          />
          <Route
            path="/my-reservations"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><MyReservations /></PrivateRoute>}
          />
          <Route
            path="/request"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><RequestPage /></PrivateRoute>}
          />
          <Route
            path="/"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><UserHomePage/></PrivateRoute>}
          />
          <Route
            path="*"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><UserHomePage /></PrivateRoute>}
          />
        </Routes>
      </div>
    );
  }
}
