import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CreateNewService from "../components/ServiceProviders/CreateNewService";
import SPLogin from "../components/ServiceProviderlogin/SPLogin";

export default class ServiceProvider extends Component {
  public render() {
    return (
      <div className="h-screen">
        {/* TODO: Handle all ServiceProvider Components */}
        <Routes>
          <Route path="/login" element={<SPLogin />} />
          <Route path="/create-service" element={<CreateNewService />} />
        </Routes>
      </div>
    );
  }
}
