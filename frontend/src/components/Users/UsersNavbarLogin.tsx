import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Are you a service provider? click here', to: '/service-providers/' },
  ]
};

const UsersNavbarLogin = (props: { className?: string }) => {
    const { brand, links } = navigation;

    return (
      <Navbar className={props.className} brand={brand} links={links} />
    );
}

export default UsersNavbarLogin;
