import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import MakeForm from './HOCs/MakeForm';
import FormError from './reusable/FormError';

class Login extends Component {
  state = { error: null, loading: null };

  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/login`, { ...this.state })
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        this.setState({ error: 'An error has occured' });
      });
  }

  render() {
    const { fields, errors } = this.props;
    console.log(this.props.errors);
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <h1>Login</h1>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="text"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.email}
            className="formInput"
          />
          <FormError error={errors.email} />
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            onChange={this.onChange}
            value={fields.password}
            className="formInput"
          />
          <FormError error={errors.password} />
          <div className="buttonContainer">
              <button className="formButton" >Sign In!</button>
          </div>
        </form> 
        <div className="linkContainer">
          <Link to="/register" className="link">sign up here.</Link>
        </div>
      </div>
    ); 
  }
}

const fields = ['email', 'password'];
const rules = {
  email: 'isEmail|required',
  password: 'isPassword|required',
};

export default MakeForm(fields, rules)(Login);