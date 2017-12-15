import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

// components
import InlineError from "../alerts/inlineError";

class MembershipForm extends React.Component {
  state = {
    data: {
      inviteCode:  "",
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    if (this.state.errors[e.target.name]) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value },
        errors
      });
    } else {
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data);
        /* .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        ); */
    }
  };

  validate = data => {
    const errors = {};
    if (!data.inviteCode) errors.inviteCode = "Cannot be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form className="membership-form" onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Oops, something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.inviteCode}>
          <label htmlFor="inviteCode">Invite Code</label>
          <input
            type="text"
            id="inviteCode"
            name="inviteCode"
            placeholder=" "
            value={data.inviteCode}
            onChange={this.onChange}
          />
          {errors.inviteCode && <InlineError text={errors.inviteCode} />}
        </Form.Field>

        <Button primary>Join</Button>
      </Form>
    );
  }
}

MembershipForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default MembershipForm;
