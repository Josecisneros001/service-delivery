import React from 'react';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Pending Reservations', to: '/users/pending-reservations' },
    { name: 'Chat', to: '/users/chat' },
  ]
};

const UsersNavbar = (props: { className?: string }) => {
    const { brand, links } = navigation;

    return (
      <Navbar className={props.className} brand={brand} links={links} />
    );
}

export default UsersNavbar;
