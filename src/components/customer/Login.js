import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '../TextField';
import {Field, reduxForm } from 'redux-form';

class Login extends Component {
    render() {
        return (
            <div className="ui container">
                <h3>Customer Login</h3>
                <form class="ui form error" onSubmit={this.props.handleSubmit((formValues) => {console.log(formValues);})}>
                    <Field label='Registered Email' name="email" component={TextField} />
                    <Field label="Password" name="password" component={TextField} type="password" />
                    <button class="ui button primary">Login</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'customerLogin'
})(Login);