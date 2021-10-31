import React, { Component } from 'react';
import './UserSignUp.css';
import FormField from './UserSignUpFormField/UserSignUpFormField'

class UserSignUp extends Component {
    render() {
        return (
            <div className='square'>
            <div className='header'> Welcome to Service Delivery!
            <FormField instruction='First Name(s)' larger={false} /></div>
            
            </div>
        );
    }
    
}

export default UserSignUp;