import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { validateToken, resetPassword } from "../../actions/auth";

// components
import ResetPasswordForm from "../forms/resetPasswordForm";

// TODO: combine this page with confirmation page

class ResetPassword extends React.Component {
  state = {
    loading: true,
    success: false,
    errors: {}
  };

  componentDidMount() {
    this.props.validateToken(this.props.match.params.token)
    .then(() => this.setState({ loading: false, success: true }))
    .catch(err =>
      this.setState({ errors: err.response.data.errors, loading: false, success: false }));
  }

  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

  render() {
    const { loading, success, errors } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        { loading &&
          <Message>Loading</Message>
        }

        { !loading && success &&
          <ResetPasswordForm submit={this.submit} token={token} />
        }

        { !loading && !success &&
          <Message>{errors.global}</Message>
        }
      </div>
    );
  }
}

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { validateToken, resetPassword })(ResetPassword);
