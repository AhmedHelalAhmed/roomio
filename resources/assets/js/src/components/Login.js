import React, { Component } from 'react'
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      password: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`/login`, { ...this.state })
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
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
          />
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            onChange={this.onChange}
            value={this.state.password}
            className="formInput"
          />
          <div className="buttonContainer">
              <button className="formButton" >Sign In!</button>
          </div>
        </form> 
        <div className="linkContainer">
          <a href="/signup" className="link">sign up here.</a>
        </div>
      </div>
    ); 
  }
}

export default Login;