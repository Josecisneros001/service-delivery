import React from "react";
import FormFieldI from "../../../Interfaces/UserSignUp/FormField";
import "./FormField.css";

class FormField extends React.Component<FormFieldI, { value: string }, {}> {
  constructor(props: FormFieldI) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<any>) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <>
        <div className="w-full text-left">
          <label> {this.props.label} </label>
        </div>
        <input
          type="text"
          className={`rounded-md w-full h-9 bg-custom-white border-cornflower-blue-500 border-2 p-3 mb-5 text-xl`}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </>
    );
  }
}

export default FormField;
