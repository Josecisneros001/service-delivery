import React from 'react';
import FormFieldI from '../../../interfaces/SignUp/FormField';

class FormField extends React.Component<FormFieldI,{ value: string },{}> {
    constructor(props: FormFieldI) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<any>) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }

    orientationClass() {
        return this.props.orientation === 'row' ? "flex-row" : "flex-col";
    }

    render() { 
        return (
            <div className={`flex-1 flex ${this.orientationClass()} text-2xl`}>
                <div className="w-full text-left">
                    <label> {this.props.label} </label>
                </div>
                <input 
                    type={!this.props.isPassword? 'text' : 'password'}
                    className={`rounded-md w-full h-9 bg-custom-white border-cornflower-blue-500 border-2 p-3 mb-5 text-xl`} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    autoComplete="nope"
                />
            </div>
        );
    }
}

export default FormField;
