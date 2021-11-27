import { Component } from "react";
import "./Login.css";
import UsersNavbarLogin from "../Users/UsersNavbarLogin";
import ServiceProviderNavbarLogin from "../ServiceProviders/ServiceProviderNavbarLogin";
import FormField from "../General/FormField/FormField";
import { LoginState, ErrorFields} from "../../interfaces/Login/LoginState";
import { Users } from "../../scripts/APIs/Users";
import { handleLogInCookies, isAuth } from "../../scripts/APIs";
import Snackbar from "../General/Snackbar";
import { Navigate } from "react-router-dom";

class Login extends Component<
  { is_service_provider: boolean },
  LoginState,
  {}
> {
  constructor(props: { is_service_provider: boolean }) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showAlert: false,
      snackBarMsg: "",
      redirectToCreate: false,
      isAuth: isAuth(this.props.is_service_provider),
      errors: {} as ErrorFields,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  configSnackbar = {
    verticalAlign: ["bottom", "top"][0],
    horizontalAlign: ["center", "left", "right"][2],
    closeButton: true,
    infinite: false,
    timeout: 5000,
  };

  handleEmail = (emailValue: string) => {
    this.setState({ email: emailValue });
  };

  handlePassword = (passwordValue: string) => {
    this.setState({ password: passwordValue });
  };

  setErrorsTimeOut = (key: string) => {
    let currentErrors = this.state.errors;
    currentErrors[key] = true;
    this.setState({errors: currentErrors});
    setTimeout( () => {
      currentErrors[key] = false;
      this.setState({errors: currentErrors});
    }, 5000);
  }

  formValidations = () => {
    if (!this.state.email) {
      this.setErrorsTimeOut("email");
      this.setState({ snackBarMsg: "Email Missing", showAlert: true });
      return false;
    }
    if (!this.state.password) {
      this.setErrorsTimeOut("password");
      this.setState({ snackBarMsg: "Password Missing", showAlert: true });
      return false;
    }
    return true;
  };

  async handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();
    if (!this.formValidations()) {
      return;
    }
    const response = await Users.login(
      this.state.email,
      this.state.password,
      this.props.is_service_provider ? 1 : 0
    );
    if (response.status !== 200) {
      this.setErrorsTimeOut("email");
      this.setErrorsTimeOut("password");
      this.setState({
        snackBarMsg: "Email or Password incorrect, please try again.",
        showAlert: true,
      });
      return;
    }
    this.setState({ isAuth: true });
    handleLogInCookies(
      response.data.id,
      response.data.token,
      this.props.is_service_provider
    );
  }

  hideSnackbar = () => {
    this.setState({ showAlert: false });
  };

  render() {
    if (this.state.isAuth) {
      if (this.props.is_service_provider) {
        return <Navigate to="/service-providers/" />;
      } else {
        return <Navigate to="/users/" />;
      }
    }
    if (this.state.redirectToCreate) {
      if (this.props.is_service_provider) {
        return <Navigate to="/service-providers/signup" />;
      } else {
        return <Navigate to="/users/signup" />;
      }
    }

    return (
      <>
        <Snackbar
          {...this.configSnackbar}
          show={this.state.showAlert}
          hideEvent={this.hideSnackbar}
          message={this.state.snackBarMsg}
        />
        {this.props.is_service_provider ? (
          <ServiceProviderNavbarLogin />
        ) : (
          <UsersNavbarLogin />
        )}
        <div className="flex flex-col w- 3/5 md:w-2/5 m-auto bg-gray-50 mt-16 shadow-lg text-center">
          <div className="text-5xl py-16 ">Welcome!</div>
          <form
            onSubmit={this.handleSubmit}
            className="flex-1 flex flex-col text-2xl"
            autoComplete="nope"
          >
            <div className="w-3/5 m-auto">
              <FormField
                orientation="col"
                label="Email"
                onChange={this.handleEmail}
                hasError={this.state.errors.email}
              />
            </div>
            <div className="w-3/5 m-auto">
              <FormField
                orientation="col"
                label="Password"
                isPassword={true}
                onChange={this.handlePassword}
                hasError={this.state.errors.password}
              />
            </div>
            <div className="items-center py-2">
              <button type="submit" className="button button1">
                Confirm
              </button>
            </div>
          </form>
          <hr />
          <div className="items-center py-2">
            <button
              className="button button2"
              onClick={() => this.setState({ redirectToCreate: true })}
            >
              Create new account
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
