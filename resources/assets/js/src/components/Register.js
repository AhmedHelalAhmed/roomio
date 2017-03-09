import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: "",
        username: "",
        password: "",
        password_confirmation: ""
      };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]:e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`/register`, { ...this.state })
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
        <form onSubmit={this.onSubmit} className="form" >
          <h1>Register</h1>
          Username: <input className="formInput" name="username" type="text" onChange={this.onChange} value={this.state.username} required/>
          Email: <input className="formInput" name="email" type="text" onChange={this.onChange} value={this.state.email} required/>
          Password: <input className="formInput" name="password" type="password" onChange={this.onChange} value={this.state.password} required />
          Confirm Password: <input className="formInput" name="password_confirmation" type="password" onChange={this.onChange} value={this.state.password_confirmation} required />
          <div className="buttonContainer">
              <button className="formButton" >Register!</button>
          </div>
        </form> 
        <div className="linkContainer">
          <a href="/signin" className="link">sign in here.</a>
        </div>
      </div>
    ); 
  }
}

export default Register;