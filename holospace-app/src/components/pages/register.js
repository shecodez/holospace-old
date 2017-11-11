import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/users";
// components
import RegisterForm from "../forms/registerForm";

class Register extends React.Component {
  // TODO: go to create vme (virtual me) page
  submit = data =>
    this.props.register(data).then(() => this.props.history.push('/channels/@me'));

  render() {
    return (
      <div className="register-page">
      <h1>create an account</h1>

      <RegisterForm submit={this.submit} />
      <p>
        {"Already have an account? "}
        <Link to="/login">Login</Link>
      </p>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { register })(Register);
