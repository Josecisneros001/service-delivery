import React from 'react';
import { Users } from '../../interfaces/models/Users';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/service-providers/' },
  links: [
    { name: 'Home', to: '/service-providers/' },
    { name: 'Availability', to: '/service-providers/availability' },
    { name: 'My Services', to: '/service-providers/my-services' },
    { name: 'Chat', to: '/service-providers/chats' },
  ]
};

const ServiceProviderNavbar = (props: { className?: string, user?: Users }) => {
    const { brand, links } = navigation;

    return (
      <Navbar isServiceProvider={true} className={props.className} brand={brand} links={links} user={props.user} />
    );
}

export default ServiceProviderNavbar;
