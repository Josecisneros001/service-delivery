import { Component } from 'react';
import '../../tailwindcss.css';
import FormField from './FormField/FormField'
import UserSignUpState from '../../interfaces/UserSignUp/UserSignUpState'

class UserSignUp extends Component<{}, UserSignUpState> {
    constructor(props: {}) {
        super(props);
        this.state = {email: '', password: '', firstName: '', middleName: '',lastName: '', phone: '', altPhone: '', recoveryEmail: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleEmail = (emailValue: string) => {
        this.setState({email: emailValue});
      }
    
      handlePassword = (passwordValue: string) => {
        this.setState({password: passwordValue});
      }

      handleFirstName = (firstNameValue: string) => {
          this.setState({firstName: firstNameValue})
      }

      handleMiddleName = (middleNameValue: string) => {
          this.setState({middleName: middleNameValue})
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
    
      handleSubmit(event: React.ChangeEvent<any>) {
        console.log(`Form submission: ${this.state.email} ${this.state.password}`);
        event.preventDefault();
      }



    render() {
        return (
            <div className="flex flex-row h-full">
                <div className='w-1/3 bg-primaryColor' />
                <div className='flex-1 px-20 space-y-3'>
                    <div className="font-semibold tracking-wider text-center lg:text-5xl py-10 sm:text-base">Welcome to <br/> Service Delivery!</div>
                    <form onSubmit={this.handleSubmit} className="flex-1 flex flex-col text-2xl">
                    <div className="flex">
                        <FormField label='First Name(s)' onChange={this.handleFirstName}/>
                        <div className="w-1/6"/>
                        <FormField label='Middle Name(s)' onChange={this.handleMiddleName} />
                    </div>
                    <div className="flex">
                        <FormField label='Last Name(s)' onChange={this.handleLastName}/>
                        <div className="w-1/6"/>
                        <FormField label='Phone #' onChange={this.handlePhone}/>
                    </div>
                    <div className="flex">
                        <FormField label='Email' onChange={this.handleEmail}/>
                    </div>
                    <div className="flex">
                        <FormField label='Password' onChange={this.handlePassword}/>
                        <div className="w-1/6"/>
                        <FormField label='Confirm Password' onChange={this.handlePassword}/>
                    </div>
                    <div className="flex">
                        <FormField label='Recovery Email' onChange={this.handleRecoveryEmail}/>
                    </div>
                    <div className="flex">
                        <FormField label='Alt Phone # (optional)' onChange={this.handleAltPhone}/>
                        <div className="w-1/4"/>
                        <div className="w-1/3"/>
                    </div>
                    <div className="items-center">
                        <button type="submit" className="button button1">Confirm</button>
                    </div>
                    </form>

                </div>
            </div>
        );
    }
    
}

export default UserSignUp;