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

    handleRegister = (e) => {
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
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleRegister}>
                    Username: <input name="username" type="text" onChange={this.onChange} value={this.state.username} required/>
                    Email: <input name="email" type="text" onChange={this.onChange} value={this.state.email} required/>
                    Password: <input name="password" type="password" onChange={this.onChange} value={this.state.password} required />
                    Confirm Password: <input name="password_confirmation" type="password" onChange={this.onChange} value={this.state.password_confirmation} required />
                    <button>Register!</button>
                </form> </div>
            </div>
        ); 
    }
}

export default Register;