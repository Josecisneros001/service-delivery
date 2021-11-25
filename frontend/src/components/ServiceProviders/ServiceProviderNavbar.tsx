import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Current Requests', to: '/service-providers/current-requests' },
    { name: 'Availability', to: '/service-providers/availability' },
    { name: 'Chat', to: '/service-providers/chats' },
  ]
};

const ServiceProviderNavbar = (props: { className?: string }) => {
    const { brand, links } = navigation;

    return (
      <Navbar isServiceProvider={true} className={props.className} brand={brand} links={links} />
    );
}

export default ServiceProviderNavbar;
