import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Are you a service provider? click here', to: '/service-provider/login' },
  ]
};

const UsersNavbarLogin = () => {
    const { brand, links } = navigation;

    return (
      <Navbar brand={brand} links={links} />
    );
}

export default UsersNavbarLogin;
