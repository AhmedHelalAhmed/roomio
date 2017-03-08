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
        this.setState({ [e.target.name]:e.target.value });
    }

    handleLogIn = (e) => {
        e.preventDefault();
        axios.post(`/login`, { email: this.state.email, password: this.state.password })
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
                <h1>Login</h1>
                <form onSubmit={this.handleLogIn}>
                    <input name="email" type="text" onChange={this.onChange} value={this.state.email} />
                    <input name="password" type="password" onChange={this.onChange} value={this.state.password} />
                    <button>Sign In!</button>
                </form> </div>
            </div>
        ); 
    }
}

export default Login;