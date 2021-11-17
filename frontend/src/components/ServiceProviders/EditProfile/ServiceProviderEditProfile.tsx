import React, { Component } from 'react';
import "../../../tailwindcss.css";
import "./ServiceProviderEditProfile.css";
import FormField from "../../UserLogin/FormField/FormField";
import ServiceProviderNavbar from "../ServiceProviderNavbar";

class ServiceProviderEditProfile extends Component {
    render() {
        return (
            <>
                <div className="coverPhoto">
                    <div className="infoProfile">
                        <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full m-2">
                            Save
                        </button>
                    </div>
                </div>
            </>
        );
    }

}

export default ServiceProviderEditProfile;