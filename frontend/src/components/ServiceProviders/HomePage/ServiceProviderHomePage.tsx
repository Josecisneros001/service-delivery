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
      <h1 className="text-3xl">Upcoming Reservations</h1>
      <div className="grid justify-items-end">
        <div className="hover:bg-gray-300 rounded-full h-10 w-40 flex items-center justify-center border-2 border-gray-300 m-2">
          <button>Add service</button>
        </div>
      </div>

      <Reservations />
    </>
  );
};

export default ServiceProviderHomePage;
