import { Component } from "react";
import "./EditProfile.css";
import UsersNavbarLogin from "../../Users/UsersNavbarLogin";
import ServiceProviderNavbarLogin from "../../ServiceProviders/ServiceProviderNavbarLogin";
import FormField from "../../General/FormField/FormField";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { Users } from "../../../scripts/APIs/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import { Navigate } from "react-router-dom";
import Snackbar from '../../General/Snackbar';

export interface EditProfileState {
	userInfo: UsersModel | null,
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	phone: string;
	snackBarMsg: string;
	showAlert: boolean;
	[key: string]: UsersModel | string | boolean | null;
};

class EditProfile extends Component<
  { is_service_provider: boolean },
  EditProfileState,
  {}
> {
    constructor(props: { is_service_provider: boolean }) {
        super(props);
        this.state = {
			userInfo: null,
            firstName: "",
			lastName: "",
            password: "",
            email: "",
            phone: "",
            snackBarMsg: "",
          	showAlert: false
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	async componentDidMount() {
		const currentUserId = getCurrentUser(this.props.is_service_provider);
		const currentInfo = (await Users.getById(currentUserId)).data as UsersModel;
		this.setState({
			userInfo: currentInfo,
		});
	}

    configSnackbar = {
        verticalAlign: ['bottom', 'top'][0],
        horizontalAlign: ['center', 'left', 'right'][2],
        closeButton: true,
        infinite: false,
        timeout: 5000,
    };

    hideSnackbar = () => {
        this.setState({showAlert: false});
    };

    handleFirstName = (firstNameValue: string) => {
        this.setState({firstName: firstNameValue})
    }


    handleLastName = (lastNameValue: string) => {
        this.setState({lastName: lastNameValue})
    }

    handlePhone = (phoneValue: string) => {
        this.setState({phone: phoneValue})
    }


    handleEmail = (emailValue: string) => {
        this.setState({ email: emailValue });
    };

    handlePassword = (passwordValue: string) => {
        this.setState({ password: passwordValue });
    };

	formValidations = () => {
        //checar que hay info en todas
        const fields = ["firstName", "lastName", "password", "email", "phone"];
        const fieldsName = ["First Name", "Last Name", "Password", "Email","Phone Number"];
        for(const index in fields) {
            const field = fields[index];
            const fieldName = fieldsName[index];
            if(!this.state[field]){
                this.setState({snackBarMsg: `Missing Field - ${fieldName}`, showAlert: true});
                return false;
            }
        }

        return true;
      };

	async handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault();
        if (!this.formValidations()) {
          return;
        }

        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            phone_number: this.state.phone,
            is_service_provider: this.props.is_service_provider ? 1 : 0
        } as UsersModel;

        const response = await Users.update(
            params,
            getCurrentUser(this.props.is_service_provider),
        );
        if (response.status !== 200) {
          this.setState({
            snackBarMsg: "Could not update the information",
            showAlert: true,
          });
          return;
        }
      }

    render() {
        return (
            <>
			<Snackbar
				{...this.configSnackbar}
				show={this.state.showAlert}
				hideEvent={this.hideSnackbar}
				message={this.state.snackBarMsg}
			/>
            <div className="coverPhoto">
                <div className="flex flex-col w- 3/5 md:w-2/5 m-auto bg-blue-100 mt-16 shadow-lg text-center rounded-3xl py-9">
                    <form
                    onSubmit={this.handleSubmit}
                    className="flex-1 flex flex-col text-2xl"
                    >
                        <div className="w-3/5 m-auto">
                        <FormField
                            orientation="col"
                            label="First Name"
                            onChange={this.handleFirstName}
                            initialValue={this.state.userInfo?.first_name}
                        />
                        </div>

                        <div className="w-3/5 m-auto">
                        </div>

                        <div className="w-3/5 m-auto">
                        <FormField
                            orientation="col"
                            label="Last Name"
                            onChange={this.handleLastName}
                            initialValue={this.state.userInfo?.last_name}
                        />
                        </div>

                        <div className="w-3/5 m-auto">
                        <FormField
                            orientation="col"
                            label="Email"
                            onChange={this.handleEmail}
                            initialValue={this.state.userInfo?.email}
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
                            onChange={this.handlePhone}
                            initialValue={this.state.userInfo?.phone_number}
                        />
                        </div>


                        <div className="w-3/5 m-auto">
                            <label className="w-full text-left">Profile Picture</label>
                            <input type="file" placeholder="" className="mt-2 mb-5 px-8 w-full border rounded py-2 text-base text-gray-700 focus:outline-none items-center bg-gray-100"/>
                        </div>

                        <div className="items-center py-2">
                            <button type="submit" className="button button1">
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                <br></br>
            </div>
            </>
        );
    }
}

export default EditProfile;