import React from "react";
import _Services from "../Services/Services";
import ServiceProviderNavbar from "../ServiceProviderNavbar";
import { NavLink } from "react-router-dom";

const MyServices = () => {
  return (
    <>
      <ServiceProviderNavbar />
      <div className="flex justify-between px-12 py-4 flex text-xl">
        <div className="text-5xl">My Services</div>
        <NavLink className="underline" to={"/service-providers/homepage"}>
          Add Service
        </NavLink>
      </div>
      <_Services />
    </>
  );
};

export default MyServices;
