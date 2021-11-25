import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props: {
    className?: string,
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
}) => {
    const { brand, links } = props;
    const NavLinks = () => links.map((link: { name: string, to: string }) => 
            <NavLink
                to={link.to}
                key={link.name}
                className={({ isActive }) => "mr-5 " + (isActive ? "font-bold" : "font-semibold")}
            >
                {link.name}
            </NavLink>
    );
    return (
        <nav className={`bg-blue-100 flex items-center justify-between p-5 ${props.className}`}>
            
            {/* TITLE OF PAGE */}
            <a href={brand.to} className="font-extrabold text-3xl ml-4 pr-4">{brand.name}</a>

            {/* LIST OF LINKS */}
            <ul className="flex flex-nowrap h-full">
                {NavLinks()}
            </ul>

        </nav>
    )
};

export default Navbar;
