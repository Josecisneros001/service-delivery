import React from "react";
import Navbar from "../General/Navbar";

const navigation = {
  brand: { name: "Service Delivery", to: "/" },
  links: [{ name: "User login? click here", to: "/users/login" }],
};

const SPNavbarLogin = () => {
  const { brand, links } = navigation;

  return <Navbar brand={brand} links={links} />;
};

export default SPNavbarLogin;
