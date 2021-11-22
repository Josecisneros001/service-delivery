import React from "react";
import "./ServiceProviderHomePage.css";
import Reservations from "../Reservations/Reservations";
import ServiceProviderNavbar from "../ServiceProviderNavbar";

const ServiceProviderHomePage = () => {
  return (
    <>
      <ServiceProviderNavbar />
      <div className="coverPhoto">
        <div className="tagUsuario">
          <p>Bienvenido nombreUsuario !</p>
          <p> Rating: #</p>
          <button type="button" className="text-xs underline">
            Edit Profile
          </button>
        </div>
      </div>
      <br></br>
      <h1 className="text-3xl py-4">Upcoming Reservations</h1>
      <Reservations />
    </>
  );
};

export default ServiceProviderHomePage;
