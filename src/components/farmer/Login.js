import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';
import TextField from '../TextField';
import {connect} from 'react-redux';
import {farmerLogin} from '../../actions'

class Login extends Component {
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.farmerLogin(formValues);
    }
    render() {
        return (
            <div className="ui container">
                <h3>Farmer Login</h3>
                <form className="ui form error" method="POST" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <Field component={TextField} label="Registered Phone" name="phone"/>
                    <Field component={TextField} label="Password" type="password" name="password"/>
                    <button className="ui primary button">Login</button>
                </form>
            </div>
        )
    }
}

const formWrapped = reduxForm({form: 'farmerLogin'})(Login);

export default connect(null, {farmerLogin})(formWrapped);