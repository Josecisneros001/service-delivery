import { Component } from 'react';
import './SignUp.css';
import FormField from "../General/FormField/FormField";
import SignUpState, { ErrorFields } from '../../interfaces/SignUp/SignUpState';
import { Users } from '../../scripts/APIs/Users';
import { Users as UsersModel } from '../../interfaces/models/Users';
import { Navigate } from 'react-router';
import { handleLogInCookies, isAuth } from '../../scripts/APIs';
import Snackbar from '../General/Snackbar';

class SignUp extends Component<{is_service_provider: boolean}, SignUpState> {
    constructor(props: {is_service_provider: boolean}) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            phone: '',
            altPhone: '',
            recoveryEmail: '',
            snackBarMsg: "",
            showAlert: false,
            isDone: false,
            errors: {} as ErrorFields,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleEmail = (emailValue: string) => {
        this.setState({email: emailValue});
    }

    handlePassword = (passwordValue: string) => {
        this.setState({password: passwordValue});
    }

    handlePassword2 = (passwordValue: string) => {
        this.setState({password2: passwordValue});
    }

    handleFirstName = (firstNameValue: string) => {
        this.setState({firstName: firstNameValue})
    }

    handleLastName = (lastNameValue: string) => {
        this.setState({lastName: lastNameValue})
    }

    handlePhone = (phoneValue: string) => {
        this.setState({phone: phoneValue})
    }

    handleAltPhone = (altPhoneValue: string) => {
        this.setState({altPhone: altPhoneValue})
    }

    handleRecoveryEmail = (recoveryEmailValue: string) => {
        this.setState({recoveryEmail: recoveryEmailValue})
    }
    
    formValidations = () => {
        const fields = ["firstName", "lastName", "password", "email", "recoveryEmail", "phone", "altPhone"];
        const fieldsName = ["First Name", "Last Name", "Password", "Email", "Recovery Email", "Phone Number", "Alt Phone Number"];
        for(const index in fields) {
            const field = fields[index];
            const fieldName = fieldsName[index];
            if(!this.state[field]){
                this.setErrorsTimeOut(field);
                this.setState({snackBarMsg: `Missing Field - ${fieldName}`, showAlert: true});
                return false;
            }
        }
        if (this.state.password !== this.state.password2) {
            this.setErrorsTimeOut("password");
            this.setErrorsTimeOut("password2");
            this.setState({snackBarMsg: "Passwords don't match", showAlert: true});
            return false;
        }
        if (this.state.phone.length  !== 10) {
            this.setErrorsTimeOut("phone");
            this.setState({snackBarMsg: "Invalid Phone", showAlert: true});
            return false;
        }
        if (this.state.altPhone.length !== 10) {
            this.setErrorsTimeOut("altPhone");
            this.setState({snackBarMsg: "Invalid Alt Phone", showAlert: true});
            return false;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(this.state.email)) {
            this.setErrorsTimeOut("email");
            this.setState({snackBarMsg: "Invalid Email", showAlert: true});
            return false;
        }
        if (!re.test(this.state.recoveryEmail)) {
            this.setErrorsTimeOut("recovEmail");
            this.setState({snackBarMsg: "Invalid Recov Email", showAlert: true});
            return false;
        }
        if  (this.state.email === this.state.recoveryEmail) {
            this.setErrorsTimeOut("email");
            this.setErrorsTimeOut("recovEmail");
            this.setState({snackBarMsg: "Email and RecoveryEmail need to be different.", showAlert: true});
            return false;
        }
        if  (this.state.phone === this.state.altPhone) {
            this.setErrorsTimeOut("phone");
            this.setErrorsTimeOut("altPhone");
            this.setState({snackBarMsg: "Phone and Alt Phone need to be different.", showAlert: true});
            return false;
        }
        return true;
    }

    async handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault();
        if(!this.formValidations()){
            return;
        }
        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            recovery_email: this.state.recoveryEmail,
            phone_number: this.state.phone,
            alt_phone_number: this.state.altPhone,
            is_service_provider: this.props.is_service_provider ? 1 : 0
        } as UsersModel;
        const responseCreate = await Users.create(params);
        if(responseCreate.status !== 200) {
            this.setState({showAlert: true});
            return;
        }

        const responseSignIn = await Users.login(this.state.email, this.state.password, this.props.is_service_provider ? 1 : 0);
        if(responseSignIn.status !== 200) {
            this.setState({showAlert: true});
            return;
        }
        handleLogInCookies(responseSignIn.data.id, responseSignIn.data.token, this.props.is_service_provider);
        this.setState({isDone: true});
    }

    setErrorsTimeOut = (key: string) => {
        let currentErrors = this.state.errors;
        currentErrors[key] = true;
        this.setState({errors: currentErrors});
        setTimeout( () => {
          currentErrors[key] = false;
          this.setState({errors: currentErrors});
        }, 5000);
    }

    render() {
        if (this.state.isDone) {
            if (this.props.is_service_provider) {
                return <Navigate to="/service-providers/upload-files" />
            } else {
                return <Navigate to="/users/upload-files" />
            }
        }
        if (isAuth(this.props.is_service_provider)) {
            if (this.props.is_service_provider) {
                return <Navigate to="/service-providers/" />
            } else {
                return <Navigate to="/users/" />
            }
        }

        return (
            <>
                <Snackbar {...this.configSnackbar} show={this.state.showAlert} hideEvent={this.hideSnackbar} message={this.state.snackBarMsg} />
                <div className="flex flex-row h-full">
                    <div className='w-1/3 bg-primaryColor' />
                    <div className='flex-1 px-20 space-y-3'>
                        <div className="font-semibold tracking-wider text-center lg:text-5xl py-10 sm:text-base">Welcome to <br/> Service Delivery!</div>
                        <form onSubmit={this.handleSubmit} className="flex-1 flex flex-col text-2xl">
                            <div className="flex">
                                <FormField
                                    orientation="col"
                                    label='First Name(s)'
                                    onChange={this.handleFirstName}
                                    hasError={this.state.errors.firstName}
                                />
                                <div className="w-1/6"/>
                                <FormField
                                    orientation="col"
                                    label='Last Name(s)'
                                    onChange={this.handleLastName}
                                    hasError={this.state.errors.lastName}
                                />
                            </div>
                            <div className="flex">
                                <FormField
                                    orientation="col"
                                    label='Phone #'
                                    onChange={this.handlePhone}
                                    hasError={this.state.errors.phone}
                                />
                                <div className="w-1/6"/>
                                <FormField
                                    orientation="col"
                                    label='Alt Phone'
                                    onChange={this.handleAltPhone}
                                    hasError={this.state.errors.altPhone}
                                />
                            </div>
                            <div className="flex">
                                <FormField
                                    orientation="col"
                                    label='Password'
                                    onChange={this.handlePassword}
                                    isPassword={true}
                                    hasError={this.state.errors.password}
                                />
                                <div className="w-1/6"/>
                                <FormField
                                    orientation="col"
                                    label='Confirm Password'
                                    onChange={this.handlePassword2}
                                    isPassword={true}
                                    hasError={this.state.errors.password2}
                                />
                            </div>
                            <div className="flex">
                                <FormField 
                                    orientation="col"
                                    label='Email'
                                    onChange={this.handleEmail}
                                    hasError={this.state.errors.email}
                                />
                            </div>
                            <div className="flex">
                                <FormField
                                    orientation="col"
                                    label='Recovery Email'
                                    onChange={this.handleRecoveryEmail}
                                    hasError={this.state.errors.recovEmail}
                                />
                            </div>
                            <div className="items-center">
                                <button type="submit" className="button button2">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
    
}

export default SignUp;
