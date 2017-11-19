import React, { Component } from "react";
import { authorizeUser } from "./AuthorizeApi";
import { Redirect } from "react-router-dom";
import "./Auth.css";

class Auth extends Component {
  state = {
    isAuthorized: false,
    showError: false,
    email: '',
    password: ''
  };

  handleChange = event => {
    switch (event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;

      case "password":
        this.setState({ password: event.target.value });
        break;

      default:
        return;
    }
  };

  handleSubmit = () => {
    const isAuthorized = authorizeUser(this.state.email, this.state.password);
    this.setState({ showError: !isAuthorized, isAuthorized });
  };

  render() {
   const { email, password, isAuthorized, showError } = this.state;
   const loginErrorMessage = showError ? <p className="error"><b>Error</b>: invalid email or password</p> : '';

    return (
      <div className="login-form">
        {isAuthorized && <Redirect to="/" />} {/* no need for this redirect but required because of test in Auth.test.js */}

        <div className="row">
          <div>Email:</div>

          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={email}
          />
        </div>

        <div className="row">
          <div>Password:</div>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
            value={password}
          />
        </div>

        <div className="row">
          <button onClick={this.handleSubmit}>Login</button>
        </div>

        {loginErrorMessage}

      </div>
    );
  }
}

export default Auth;
