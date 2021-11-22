import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'My services', to: '/service-providers/my-services' },
    { name: 'Chat', to: '/service-provider/chat' },
  ]
};

const ServiceProviderNavbar = () => {
    const { brand, links } = navigation;

    return (
      <Navbar brand={brand} links={links} />
    );
}

export default ServiceProviderNavbar;
