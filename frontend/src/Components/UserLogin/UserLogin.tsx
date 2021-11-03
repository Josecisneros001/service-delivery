import { Component } from "react";
import "../../tailwindcss.css";
import "./UserLogin.css";
import FormField from "./FormField/FormField";

class UserLogin extends Component {
  render() {
    return (
      <div>
        <div className="flex flex-row justify-between bg-primaryColor">
          <div className="text-5xl p-5">Service Delivery</div>
          <div className="text-2xl p-4">
            Are you a service provider?
            <button className="text-2xl p-4 underline">click here</button>
          </div>
        </div>
        <div className="flex flex-col w-2/5 m-auto bg-gray-50 mt-16 shadow-lg">
          <div className="text-5xl py-16 ">Welcome!</div>

          <div className="w-3/5 m-auto">
            <FormField label="Email" />
          </div>

          <div className="w-3/5 m-auto">
            <FormField label="Password" />
          </div>

          <div className="items-center py-2">
            <button className="button button1">Confirm</button>
          </div>
          <div className="line m-auto"></div>
          <div className="items-center py-2">
            <button className="button button2">Create new account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
