import { Component } from "react";
import FormField from "../../General/FormField/FormField";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { Users } from "../../../scripts/APIs/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import Snackbar from '../../General/Snackbar';
import ServiceProviderNavbar from "../ServiceProviderNavbar";
import UsersNavbar from "../../Users/UsersNavbar";

export interface EditProfileState {
	userInfo: UsersModel | undefined,
	firstName: string;
	lastName: string;
	password: string;
	email: string;
    recovEmail: string;
	phone: string;
    altPhone: string;
	snackBarMsg: string;
	showAlert: boolean;
    isLoading: boolean;
	[key: string]: UsersModel | string | boolean | undefined;
};

class EditProfile extends Component<
  { is_service_provider: boolean },
  EditProfileState,
  {}
> {
    constructor(props: { is_service_provider: boolean }) {
        super(props);
        this.state = {
			userInfo: undefined,
            firstName: "",
			lastName: "",
            password: "",
            email: "",
            recovEmail: "",
            phone: "",
            altPhone: "",
            snackBarMsg: "",
          	showAlert: false,
            isLoading: false
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

    handleAltPhone = (phoneValue: string) => {
        this.setState({altPhone: phoneValue})
    }

    handleEmail = (emailValue: string) => {
        this.setState({ email: emailValue });
    };

    handleRecovEmail = (emailValue: string) => {
        this.setState({recovEmail: emailValue });
    };

	formValidations = () => {
        //checar que hay info en todas
        const fields = ["firstName", "lastName", "email", "recovEmail", "phone", "altPhone"];
        const fieldsName = ["First Name", "Last Name", "Email", "Recovery Email", "Phone Number", "Alt. Phone"];
        for(const index in fields) {
            const field = fields[index];
            const fieldName = fieldsName[index];
            if(!this.state[field]){
                this.setState({snackBarMsg: `Missing Field - ${fieldName}`, showAlert: true});
                return false;
            }
        }

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(this.state.email)) {
            this.setState({snackBarMsg: "Invalid Email", showAlert: true});
            return false;
        }

        if (!re.test(this.state.recovEmail)) {
            this.setState({snackBarMsg: "Invalid Recovery Email", showAlert: true});
            return false;
        }

        return true;
    };

	async handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault();
        if (!this.formValidations()) {
          return;
        }
        this.setState({isLoading: true});
        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            recovery_email: this.state.recovEmail,
            phone_number: this.state.phone,
            alt_phone_number: this.state.altPhone,
        } as UsersModel;

        const response = await Users.update(
            params,
            getCurrentUser(this.props.is_service_provider),
        );
        if (response.status !== 200) {
            this.setState({
                snackBarMsg: " Server Error - Try Again Later",
                showAlert: true,
            });
            this.setState({isLoading: false});
            return;
        }
        
        this.setState({
            snackBarMsg: "Saved Successfully",
            showAlert: true,
        });
        this.setState({isLoading: false});
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
                {this.props.is_service_provider ? (
                    <ServiceProviderNavbar user={this.state.userInfo} />
                ) : (
                    <UsersNavbar user={this.state.userInfo} />
                )}
                <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 m-auto bg-blue-100 mt-16 shadow-lg text-center rounded-3xl py-9"
                    style={{opacity: this.state.isLoading? '0.5' : '1'}}
                >
                    <div className="text-3xl w-full pb-3">Update User Info</div>
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
                                label="Recovery Email"
                                onChange={this.handleRecovEmail}
                                initialValue={this.state.userInfo?.recovery_email}
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
                            <FormField
                                orientation="col"
                                label="Phone"
                                onChange={this.handleAltPhone}
                                initialValue={this.state.userInfo?.alt_phone_number}
                            />
                        </div>

                        <div className="items-center py-2">
                            <button type="submit" className="button button1">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default EditProfile;