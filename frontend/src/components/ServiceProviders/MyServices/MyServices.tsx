import React from "react";
import _Services from "../Services/Services";
import ServiceProviderNavbar from "../ServiceProviderNavbar";

const MyServices = () => {
  return (
    <>
      <ServiceProviderNavbar />
      <div className="flex justify-between px-12 py-4 flex text-xl">
        <div className="text-5xl">My Services</div>
        <button className="underline">Add service</button>
      </div>
      <_Services />
    </>
  );
};

export default MyServices;
