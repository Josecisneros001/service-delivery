import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
  ]
};

const ServiceProviderNavbarLogin = () => {
    const { brand, links } = navigation;

    return (
      <Navbar brand={brand} links={links} />
    );
}

export default ServiceProviderNavbarLogin;
