import React from 'react';
import { Users } from '../../interfaces/models/Users';
import Navbar from '../General/Navbar';

const navigation = {
  brand: { name: 'Service Delivery', to: '/users/' },
  links: [
    { name: 'Home', to: '/users/' },
    { name: 'My Reservations', to: '/users/my-reservations' },
    { name: 'Chat', to: '/users/chats' },
  ]
};

const UsersNavbar = (props: { className?: string, user?: Users }) => {
    const { brand, links } = navigation;

    return (
      <Navbar isServiceProvider={false} className={props.className} brand={brand} links={links} user={props.user} />
    );
}

export default UsersNavbar;
