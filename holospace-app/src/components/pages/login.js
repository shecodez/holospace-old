import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { login, resetPasswordRequest } from "../../actions/auth";

// components
import LoginForm from "../forms/loginForm";

class Login extends React.Component {
  state = {
    isOpen: false,
    email: ''
  };

  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/channels/@me"));

  submitResetPasswordRequest = email => {
    this.setState({ email });
    this.props.resetPasswordRequest(email);
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen, email } = this.state

    return (
      <div className="login-page">
        <h1>Hey, Welcome back!</h1>

        <LoginForm
          submit={this.submit}
          resetPasswordRequest={this.submitResetPasswordRequest}
        />

        <p>
          {"Don't have an account? "}
          <Link to="/register">Register</Link>
        </p>

        <Modal size="mini" open={isOpen} onClose={this.toggleModal}
          header="Password Reset Sent"
          content={`We sent instructions to reset your password to ${email}. Please be sure to check both your inbox and spam folder.`}
          actions={[
            { key: "ok", content: "OK", positive: true },
          ]}
        />
      </div>
    );
  }
}

Login.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired,
    resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { login, resetPasswordRequest })(Login);
