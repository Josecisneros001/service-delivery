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

    render() { 
        return (
            <>
                <div className=" text-left">
                    <label> {this.props.label} </label>
                </div>
                <textarea  
                    className={`rounded-md w-full bg-custom-white border-cornflower-blue-500 border-2 p-3 mb-5 text-lg`} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    rows={4}
                />
            </>
        );
    }
}

export default FormField;
