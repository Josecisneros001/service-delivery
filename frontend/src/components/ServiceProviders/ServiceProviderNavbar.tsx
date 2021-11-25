import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/service-providers/homepage' },
  links: [
    { name: 'My Services', to: '/service-providers/my-services' },
    { name: 'Chat', to: '/service-providers/chats' },
  ]
};

const ServiceProviderNavbar = (props: { className?: string }) => {
    const { brand, links } = navigation;

    return (
      <Navbar className={props.className} brand={brand} links={links} />
    );
}

export default ServiceProviderNavbar;
