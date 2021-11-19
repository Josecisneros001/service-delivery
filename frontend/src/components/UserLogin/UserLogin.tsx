import { Component } from "react";
import "../../tailwindcss.css";
import "./UserLogin.css";
import UsersNavbarLogin from "../Users/UsersNavbarLogin";
import FormField from "./FormField/FormField";
import UserLoginState from "../../Interfaces/UserLogin/UserLoginState";

class UserLogin extends Component<{}, UserLoginState, {}> {
  constructor(props: {}) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail = (emailValue: string) => {
    this.setState({ email: emailValue });
  };

  handlePassword = (passwordValue: string) => {
    this.setState({ password: passwordValue });
  };

  handleSubmit(event: React.ChangeEvent<any>) {
    console.log(`Form submission: ${this.state.email} ${this.state.password}`);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <UsersNavbarLogin />
        <div className="flex flex-col w-2/5 m-auto bg-gray-50 mt-16 shadow-lg text-center">
          <div className="text-5xl py-16 ">Welcome!</div>
          <form
            onSubmit={this.handleSubmit}
            className="flex-1 flex flex-col text-2xl"
          >
            <div className="w-3/5 m-auto">
              <FormField label="Email" onChange={this.handleEmail} />
            </div>
            <div className="w-3/5 m-auto">
              <FormField label="Password" onChange={this.handlePassword} />
              <div className="text-xs text-right mb-4">
                Forgot your password?{" "}
                <button type="button" className="text-xs underline">
                  click here
                </button>
              </div>
            </div>
            <div className="items-center py-2">
              <button type="submit" className="button button1">
                Confirm
              </button>
            </div>
          </form>
          <hr />
          <div className="items-center py-2">
            <button className="button button2">Create new account</button>
          </div>
        </div>
      </>
    );
  }
}

export default UserLogin;
