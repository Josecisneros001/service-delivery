import { Component } from 'react';
import '../../tailwindcss.css';
import './UserSignUp.css';
import FormField from './FormField/FormField'

class UserSignUp extends Component {
    render() {
        return (
            <div className="flex flex-row h-full">
                <div className='w-1/3 bg-primaryColor' />
                <div className='flex-1 px-20 space-y-3'>
                    <div className="lg:text-5xl py-10 sm:text-base">Welcome to <br/> Service Delivery!</div>
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
                    <div className="flex">
                        <FormField label='Email' />
                    </div>
                    <div className="flex">
                        <FormField label='Password' />
                        <div className="w-1/6"/>
                        <FormField label='Confirm Password' />
                    </div>
                    <div className="flex">
                        <FormField label='Recovery Email' />
                    </div>
                    <div className="flex">
                        <FormField label='Alt Phone # (optional)' />
                        <div className="w-1/4"/>
                        <div className="w-1/3"/>
                    </div>
                    <div className="items-center">
                        <button className="button button1">Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default UserSignUp;