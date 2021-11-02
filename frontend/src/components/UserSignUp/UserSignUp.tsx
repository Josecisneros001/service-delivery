import { Component } from 'react';
import './UserSignUp.css';
import FormField from './FormField/FormField'

class UserSignUp extends Component {
    render() {
        return (
            <div className="flex flex-row h-full">
                <div className='w-1/3 bg-primaryColor' />
                <div className='flex-1 px-20'>
                    <div className="text-xl md:text-2xl">Welcome to Service Delivery!</div>
                    <div className="flex">
                        <FormField label='First Name(s)' />
                        <div className="w-1/6"/>
                        <FormField label='Middle Name(s)' />
                    </div>
                    <div className="flex">
                        <FormField label='Last Name(s)' />
                        <div className="w-1/6"/>
                        <FormField label='Phone #' />
                    </div>
                </div>
            </div>
        );
    }
    
}

export default UserSignUp;