import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";

// components
import LoginForm from "../forms/loginForm";

class Login extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/"));

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

Login.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
