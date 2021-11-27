import * as React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Users } from '../../interfaces/models/Users';
import { getFileUrl, handleLogOutCookies } from '../../scripts/APIs';

const Navbar = (props: {
    className?: string,
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
    user?: Users,
    isServiceProvider: boolean,
}) => {
    const [userOptions, setUserOptions] = React.useState(false);
    const [logOut, setLogOut] = React.useState(false);
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
    if (logOut) {
        if (props.isServiceProvider) {
            return <Navigate to="/service-providers/login" />
        } else {
            return <Navigate to="/users/login" />
        }
    }
    return (
        <nav className={`relative bg-blue-100 flex flex-row items-center justify-between p-5 ${props.className}`}>
            
            {/* TITLE OF PAGE */}
            <a href={brand.to} className="relative flex-initial text-3xl ml-4 pr-4">
                <span className="font-extrabold">{brand.name}</span>
                {props.isServiceProvider
                ?   <div className="text-xl absolute -bottom-5 -right-20 "> Providers </div>
                :   <div className="text-xl absolute -bottom-5 -right-10 "> Users </div>}
            </a>
            

            {/* LIST OF LINKS */}
            <ul className="flex-1 flex flex-nowrap h-full justify-end mr-4 sm:mr-8">
                {NavLinks()}
            </ul>

            {props.user
            ?   <div className="flex-initial">
                    <img
                        className="rounded-full w-10 h-10 -my-1 cursor-pointer"
                        src={getFileUrl(props.user.profile_picture)}
                        alt="a"
                        onClick={() => setUserOptions(!userOptions)}
                    />
                    <div className="absolute z-40 w-26 top-full right-0 bg-blue-100" style={{display: userOptions? 'block' : 'none'}}>
                        <div className="hover:bg-blue-200 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                            <NavLink
                                to={`/${props.isServiceProvider? "service-providers" : "users"}/edit-profile`}
                            >
                                Edit Profile
                            </NavLink>
                        </div>
                        <div
                            className="hover:bg-blue-200 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                            onClick={()=>{
                                handleLogOutCookies(props.isServiceProvider);
                                setLogOut(true);
                            }}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
            :   <div className="w-10 h-10 -my-1">&nbsp;</div>
            }

        </nav>
    )
};

export default Navbar;
