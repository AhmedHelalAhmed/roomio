import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import MakeForm from './HOCs/MakeForm';
import FormError from './reusable/FormError';

class Register extends Component {
  componentWillMount() {
    document.title = 'Register';
  }

  onSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/register`, this.props.getEscapedFields())
      .then(res => {
        window.location = '/';
      })
      .catch(err => {
        if (err.response.data) {
          this.props.createErrorsFromResponse(err.response.data);
        }
        this.setState({ error: 'An error has occured' });
      });
  };

  render() {
    const { fields, errors } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <h1>Join <Link className="leaveForm" to="/">Roomio</Link></h1>
          <label htmlFor="username">Username: </label>
          <input
            className="formInput"
            name="username"
            type="text"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.username}
          />
          <FormError error={errors.username} />
          <label htmlFor="email">Email: </label>
          <input
            className="formInput"
            name="email"
            type="text"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.email}
          />
          <FormError error={errors.email} />
          <label htmlFor="password">Password: </label>
          <input
            className="formInput"
            name="password"
            type="password"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.password}
          />
          <FormError error={errors.password} />
          <label htmlFor="password_confirmation">Confirm Password: </label>
          <input
            className="formInput"
            name="password_confirmation"
            type="password"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.password_confirmation}
          />
          <FormError error={errors.password_confirmation} />
          <div className="buttonContainer">
            <button className="formButton">Register!</button>
          </div>
        </form>
        <div className="linkContainer">
          <Link to="/login" className="link">sign in here.</Link>
        </div>
      </div>
    );
  }
}

const fields = ['email', 'username', 'password', 'password_confirmation'];

const rules = {
  email: 'isEmail|required',
  username: 'required',
  password: 'isPassword|required',
  password_confirmation: 'isPassword|required|sameAs:password',
};

export default MakeForm(fields, rules)(Register);
