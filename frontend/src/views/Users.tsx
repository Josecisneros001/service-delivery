import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import PrivateRoute from '../scripts/PrivateRoute';
import UploadFilesForm from '../components/SignUp/UploadFilesForm/UploadFilesForm';
import Chats from '../components/Chats/Chats';
import RequestPage from '../components/Users/RequestPage';

export default class Users extends Component {

  public render() {
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login is_service_provider={false}/>}/>
          <Route path="/signup" element={<SignUp is_service_provider={false}/>}/>
          <Route
            path="/upload-files"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><UploadFilesForm is_service_provider={false}/></PrivateRoute>}
          />
         <Route
            path="/chats"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><Chats is_service_provider={false}/></PrivateRoute>}
          /> 
          {/* TODO: Change * to Home View */}
          <Route
            path="*"
            element={<PrivateRoute is_service_provider={false} redirectTo="login"><>Home</></PrivateRoute>}
          />
          <Route path="/request" element={<RequestPage/>}/>
        </Routes>
      </div>
    );
  }
}
