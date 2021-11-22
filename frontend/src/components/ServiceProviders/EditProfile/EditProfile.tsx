import { Component } from "react";
import "./EditProfile.css";
import UsersNavbarLogin from "../../Users/UsersNavbarLogin";
import ServiceProviderNavbarLogin from "../../ServiceProviders/ServiceProviderNavbarLogin";
import FormField from "../../General/FormField/FormField";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { Users } from "../../../scripts/APIs/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import { Navigate } from "react-router-dom";

class EditProfile extends Component<
  { is_service_provider: boolean },
  UsersModel,
  {}
> {
    constructor(props: { is_service_provider: boolean }) {
        super(props);
        this.state = {
          //aqui tengo que poner el id del usuario actual
          //get la info de los usuarios y ponerla aquí
          id: getCurrentUser(this.props.is_service_provider),
          first_name: "",
          last_name: "",
          password: "",
          email: "",
          recovery_email: "",
          phone_number: "",
          alt_phone_number: "",
          profile_picture: "",
          file_id: "",
          file_proof_of_address: "",
          is_service_provider: 0, //no se si esto debería estar así
          registered_on: "",
          //[key: string]: ""
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleEmail = (emailValue: string) => {
        this.setState({ email: emailValue });
      };

      handlePassword = (passwordValue: string) => {
        this.setState({ password: passwordValue });
      };

      formValidations = () => {
        if (!this.state.email) {
          this.setState({ snackBarMsg: "Email Missing", showAlert: 1 });
          return false;
        }
        if (!this.state.password) {
          this.setState({ snackBarMsg: "Password Missing", showAlert: 1 });
          return false;
        }
        return true;
      };

      async handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault();
        if (!this.formValidations()) {
          return;
        }

        const params = {
            first_name: `${this.state.firstName} ${this.state.middleName}`,
            last_name: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            recovery_email: this.state.recoveryEmail,
            phone_number: this.state.phone,
            alt_phone_number: this.state.altPhone,
            is_service_provider: this.props.is_service_provider ? 1 : 0
        } as UsersModel;

        const response = await Users.update(
            params,
            getCurrentUser(this.props.is_service_provider),
          //(params: Model, id: number)
          //this.props.is_service_provider ? 1 : 0
        );
        if (response.status !== 200) {
          this.setState({
            snackBarMsg: "Could not update the information",
            showAlert: 1,
          });
          return;
        }
      }
    
    render() {
        return (
            <div className="flex flex-c3/5 md:w-2/5 m-auto bg-gray-50 mt-16 shadow-lg text-center">
                <form
                    onSubmit={this.handleSubmit}
                    className="flex-1 flex flex-col text-2xl"
                    >
                    <div className="w-3/5 m-auto">
                    <FormField
                        orientation="col"
                        label="Email"
                        onChange={this.handleEmail}
                        placeholder="getemailusuario"
                    />
                    </div>

                    <div className="w-3/5 m-auto">
                        <FormField
                            orientation="col"
                            label="Password"
                            onChange={this.handlePassword}
                        />
                    </div>

                    <div className="w-3/5 m-auto">
                    <FormField
                        orientation="col"
                        label="Phone"
                        onChange={this.handleEmail}
                        placeholder="getphoneusuario"
                    />
                    </div>

                    <div className="items-center py-2">
                        <button type="submit" className="button button1">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProfile;