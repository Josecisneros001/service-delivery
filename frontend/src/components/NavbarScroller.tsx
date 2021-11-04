import * as React from 'react'

/*
TO USE THIS NAVBAR:
- On the view where it's going to be used, add the following nav variable

const navigation = {
  brand: { name: 'Service Delivery', to: '/' },
  links: [
    { name: 'Current Requests', to: '/' },
    { name: 'Weekly Calendar', to: '/' },
    { name: 'Chat', to: '/' },
  ]
};

- brand is an object with the name of the app and the link where it will forward to
- links is an array of objects
    - Each object has the name that appears on the navbar and the link where it forwards to
- To add the Navbar to the DOM:

<NavbarScroller brand={brand} links={links} />

*/

const NavbarScroller = (props: {
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
}) => {
    const { brand, links } = props;
    const NavLinks: any = () => links.map((link: { name: string, to: string }) => 
            <li key={link.name} className="mr-5 font-semibold">
                <a href={link.to}>{link.name}</a>
            </li>
    );
    return (
        <nav className="bg-blue-100 flex items-center justify-between p-5">
            
            {/* TITLE OF PAGE */}
            <a href={brand.to} className="font-extrabold text-3xl ml-4 pr-4">{brand.name}</a>

            {/* LIST OF LINKS */}
            <ul className="flex flex-nowrap h-full">
                <NavLinks />
            </ul>

        </nav>
    )
};

export default NavbarScroller;