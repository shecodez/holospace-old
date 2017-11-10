import React from "react";
import { Link } from "react-router-dom";

// components
import LoginForm from "../forms/loginForm";

class Login extends React.Component {
  submit = data => {
    console.log(data);
  }

  render() {
    return (
      <div className="login-page">
        <h1>Hey, Welcome back!</h1>

        <LoginForm submit={this.submit} />

        <p>
          {"Don't have an account? "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default Login;
