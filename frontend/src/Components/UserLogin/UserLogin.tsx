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
        <div className="w-2/5 m-auto bg-gray-50">
          <div className="text-5xl py-16 ">Welcome!</div>

          <div className="flex">
            <FormField label="Email" />
          </div>

          <div className="flex">
            <FormField label="Recovery Email" />
          </div>

          <div className="items-center">
            <button className="button button1">Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
