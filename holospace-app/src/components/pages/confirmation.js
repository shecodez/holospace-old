import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { confirm } from "../../actions/auth";

class Confirmation extends React.Component {
  state = {
    loading: true,
    success: false,
    errors: {}
  };

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false, success: false }));
  }

  /* resend = () => {
    console.log("Resend confirmation token");
  } */

  render() {

    const { errors, loading, success } = this.state;

    return (
      <div>
        { loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email.</Message.Header>
          </Message>
        )}

        { !loading && success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Thank you! Your email has beem validated.
              </Message.Header>
              <Link to="/channels/@me" >Open Application</Link>
            </Message.Content>
          </Message>
        )}

        { !loading && !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>{errors.global}</Message.Header>
              {/* TODO: errors.global === "Invalid token" &&
                <Button onClick={this.resend}>Resend confirmation token</Button>
              */}
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}

Confirmation.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(Confirmation);
