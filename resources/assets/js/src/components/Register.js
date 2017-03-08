import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            username: "",
            password: "",
            confirm: ""
         };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]:e.target.value });
    }

    handleRegister = (e) => {
        e.preventDefault();
        axios.post(`/register`, { username: this.state.username, email: this.state.email, password: this.state.password, password_confirmation: this.state.confirm })
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
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleRegister}>
                    Username: <input name="username" type="text" onChange={this.onChange} value={this.state.username} required/>
                    Email: <input name="email" type="text" onChange={this.onChange} value={this.state.email} required/>
                    Password: <input name="password" type="password" onChange={this.onChange} value={this.state.password} required />
                    Confirm Password: <input name="confirm" type="password" onChange={this.onChange} value={this.state.confirm} required />
                    <button>Register!</button>
                </form> </div>
            </div>
        ); 
    }
}

export default Register;