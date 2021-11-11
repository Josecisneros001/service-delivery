import React, { Component } from 'react';
import "../../../tailwindcss.css";
import "./ServiceProviderEditProfile.css";
import FormField from "../../UserLogin/FormField/FormField";
import ServiceProviderNavbar from "../ServiceProviderNavbar";

class ServiceProviderEditProfile extends Component {
    render() {
        return (
            <>
                {/*<ServiceProviderNavbar/> */}
                <div className="coverPhoto">
                    <div className="infoProfile">
                        <div className="w-3/5 m-auto">
                            {/*<FormField label="Name" onChange={this.changeName}/> */}
                        </div>
                        <div className="w-3/5 m-auto">
                            {/* <FormField label="Password" onChange={this.changePassword}/> */}
                        </div>
                        <div className="w-3/5 m-auto">
                            {/* <FormField label="Phone" onChange={this.changePhone}/> */}
                        </div>
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