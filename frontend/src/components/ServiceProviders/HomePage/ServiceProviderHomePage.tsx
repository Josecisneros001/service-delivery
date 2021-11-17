import React, { Component } from 'react';
import "../../../tailwindcss.css";
import "./ServiceProviderHomePage.css";
import coverProfile from "../../../images/garden.png"
import ServiceProviderNavbar from "../ServiceProviderNavbar";

class ServiceProviderHomePage extends Component{
    render() {
        return (
            <>
                <div className="coverPhoto">
                    <div className="tagUsuario">
                        <p>Bienvenido nombreUsuario !</p>
                        <p> Rating: #</p>
                        <button type="button" className="text-xs underline">Edit Profile</button>
                    </div>
                </div>
                <br></br>
                <h1>Upcoming Reservations</h1>
                <div className="hover:bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-300 m-2">
                    <button className="button-crearservicio">+</button>
                </div>

            </>
        );
    }

}

export default ServiceProviderHomePage;