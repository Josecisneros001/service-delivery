import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Current Requests', to: '/service-provider/current-requests' },
    { name: 'Weekly Calendar', to: '/service-provider/weekly-calendar' },
    { name: 'Chat', to: '/service-provider/chat' },
  ]
};

const ServiceProviderNavbar = (props: { className?: string }) => {
    const { brand, links } = navigation;

    return (
      <Navbar className={props.className} brand={brand} links={links} />
    );
}

export default ServiceProviderNavbar;
