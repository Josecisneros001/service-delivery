import React from 'react';
import FormFieldInterface from './UserSignUpFormFieldInterface';
import './UserSignUpFormField.css'

class FormField extends React.Component<FormFieldInterface,{}> {
constructor(props: FormFieldInterface) {
    super(props);
}

    render() { 
        return (
            <div className='instructionForm'>
                {this.props.instruction}
            </div>
        );
    }
}

export default FormField;