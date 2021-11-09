import React from 'react';
import FormFieldI from '../../../Interfaces/UserSignUp/FormField';
import './FormField.css'

class FormField extends React.Component<FormFieldI,{ value: string },{}> {
    constructor(props: FormFieldI) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<any>) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: React.ChangeEvent<any>) {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() { 
        return (
            <form onSubmit={this.handleSubmit} className="flex-1 flex flex-col text-2xl">
                <div className="w-full text-left">
                    <label> {this.props.label} </label>
                </div>
                <input 
                    type='text' 
                    className={`rounded-md w-full h-9 bg-custom-white border-cornflower-blue-500 border-2 p-3 mb-5 text-xl`} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                />
            </form>
        );
    }
}

export default FormField;
