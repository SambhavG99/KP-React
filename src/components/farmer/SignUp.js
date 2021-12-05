import React, { Component } from "react";
import axios from "axios";

import { states, all_districts } from "../../api/states";
import TextField from "../TextField";
import { Field, formValues, reduxForm, formValueSelector } from "redux-form";

import { connect } from "react-redux";
import { farmerSignUp } from "../../actions";

class SignUp extends Component {  
  
  renderStateDropDown = ({ data, label, input }) => {
    const renderedOptions = data.map((item) => {
      return (
        <option key={item.key} value={item.name}>
          {item.name}
        </option>
      );
    });
    
    return (
      <div className="field">
        <label htmlFor="state">{label}</label>
        <select
          className="ui dropdown"
          onChange={input.onChange}
          value={input.value}
          >
          <option value="">{label}</option>
          {renderedOptions}
        </select>
      </div>
    );
  };
  
  renderDistrictDropDown = ({ data, label, input, stateRegion }) => {
    const renderDistricts = (stateRegion) => {
      const stateInfo = data.filter(obj => obj.state === stateRegion);
      if(!stateInfo[0].districts) return <option value="No Districts">No Districts</option>
      return stateInfo[0].districts.map( (district, index) => {
        return (
          (index === 0) ? <option key="0" value="">Select District</option> :
          <option key={district} value={district}>{district}</option>
          );
        });
      }
      
      return (
        <div className="field">
        <label htmlFor="state">{label}</label>
        <select
          className="ui dropdown"
          {...input}
          >
          {stateRegion ? renderDistricts(stateRegion) : <option value="">Select State</option>}
        </select>
      </div>
    );
  };
  
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.farmerSignUp(formValues);
  };
  
  render() {
    return (
      <div className="ui container">
        <h3>Farmer Sign Up</h3>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          method="POST"
        >
          <Field component={TextField} name="name" label="Name" />
          <Field
            component={TextField}
            name="password"
            label="Password"
            type="password"
          />
          <Field component={TextField} name="phone" label="Phone" />
          <Field
            component={TextField}
            name="aadhaar"
            label="Aadhaar Card Number"
          />
          <Field
            component={this.renderStateDropDown}
            data={states}
            name="state"
            label="State"
          />
          <Field
            component={this.renderDistrictDropDown}
            name="district"
            label="District"
            data={all_districts}
            stateRegion = {this.props.stateRegion}
          />
          <button className="ui primary button">Sign Up</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Name is required";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "farmerSignUp",
  validate,
})(SignUp);

const selector = formValueSelector('farmerSignUp');
const mapStateToProps = (state) => {
  const stateRegion =  selector(state,'state');
  return {stateRegion};
}

export default connect(mapStateToProps, { farmerSignUp })(formWrapped);
