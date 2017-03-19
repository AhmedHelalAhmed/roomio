import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

class Login extends Component {
  state = { 
    email: "",
    password: "",
    error: null,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    });
  }

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
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <h1>Login</h1>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            onChange={this.onChange}
            value={this.state.email}
            className="formInput"
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            onChange={this.onChange}
            value={this.state.password}
            className="formInput"
            required
          />
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

export default Login;