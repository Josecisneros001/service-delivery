import React from 'react';
import FormFieldInterface from './UserSignUpFormFieldInterface';
import './UserSignUpFormField.css'

class FormField extends React.Component<FormFieldInterface,{ value: string },{}> {
constructor(props: FormFieldInterface) {
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
            <form onSubmit={this.handleSubmit} className="instructionForm">
                <div>
                    <label> {this.props.instruction} </label>
                </div>
                    <input 
                    type='text' 
                    className={`rounded-md w-96 h-9 bg-custom-white border-cornflower-blue-500 border-2 p-3 mb-5 text-xl ${ this.props.larger ? "w-872" : "w-365"}`} 
                    value={this.state.value} 
                    onChange={this.handleChange}/>
                
            </form>
        );
    }
}

export default FormField;