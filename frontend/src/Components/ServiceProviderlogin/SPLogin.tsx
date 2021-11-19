import { Component } from "react";
import "../../tailwindcss.css";
import "./SPLogin.css";
import SPNavbarLogin from "../Users/SPNavbarLogin";
import FormField from "./FormField/FormField";

class SPLogin extends Component {
  render() {
    return (
      <>
        <SPNavbarLogin/>
        <div className="flex flex-col w-2/5 m-auto bg-gray-50 mt-16 shadow-lg text-center">
          <div className="text-5xl py-16 ">Welcome Provider!</div>
          <div className="w-3/5 m-auto">
            <FormField label="Email" />
          </div>
          <div className="w-3/5 m-auto">
            <FormField label="Password" />
            <div className="text-xs text-right mb-4">
              Forgot your password?{" "}
              <button className="text-xs underline">click here</button>
            </div>
          </div>
          <div className="items-center py-2">
            <button className="button button1">Confirm</button>
          </div>
          <hr />
          <div className="items-center py-2">
            <button className="button button2">Create new account</button>
          </div>
        </div>
      </>
    );
  }
}

export default SPLogin;
