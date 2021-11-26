import React from 'react';
import FormFieldI from '../../../interfaces/SignUp/FormField';

class FormField extends React.Component<FormFieldI,{ value: string },{}> {
    constructor(props: FormFieldI) {
        super(props);
        this.state = {value: props.initialValue || ''};
        this.props.onChange(props.initialValue || '');
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps: FormFieldI) {
        if(this.props.initialValue !== prevProps.initialValue) {
            this.setState({value: this.props.initialValue || ''});
            this.props.onChange(this.props.initialValue || '');
        }
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
            <div className={`flex-1 flex ${this.orientationClass()} text-2xl`}  style={{opacity: this.props.disabled? '0.5' : '1'}} >
                <div className="w-full text-left">
                    <label> {this.props.label} </label>
                </div>
                {!this.props.type || this.props.type === "INPUT"
                ?   <input 
                        type={!this.props.isPassword? 'text' : 'password'}
                        className={`rounded-md w-full h-9 bg-custom-white border-2 p-3 mb-5 text-xl ${this.props.hasError? 'border-red-600' : 'border-cornflower-blue-500'}`} 
                        value={this.state.value} 
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        autoComplete="nope"
                        disabled={this.props.disabled}
                    />
                :   <></>}
                {this.props.type === "TEXTAREA"
                ?   <textarea 
                        className={`rounded-md w-full bg-custom-white  ${this.props.hasError? 'border-red-600' : 'border-cornflower-blue-500'} border-2 p-3 mb-5 text-xl`} 
                        value={this.state.value} 
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        autoComplete="nope"
                        disabled={this.props.disabled}
                    />
                :   <></>}
                {this.props.type === "SELECT"
                ?   <select 
                        className={`rounded-md w-full h-9 bg-custom-white ${this.props.hasError? 'border-red-600' : 'border-cornflower-blue-500'} border-2 mb-5 text-xl`} 
                        value={this.state.value} 
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        autoComplete="nope"
                        disabled={this.props.disabled}
                    >
                        {this.props.children} 
                    </select>
                :   <></>}
            </div>
        );
    }
}

export default FormField;
