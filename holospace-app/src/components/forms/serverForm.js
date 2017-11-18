import React from 'react';
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

// components
import InlineError from "../alerts/inlineError";

class ServerForm extends React.Component {
  state = {
    data: {
      name: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = (data) => {
    const errors = {};
    // TODO: don't allow curse words to be server name
    if (!data.name) errors.name = "Cannot be blank";
    if (data.name.length > 50) errors.name = "Name too long";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form className="server-form" onSubmit={this.onSubmit} loading={loading}>
        { errors.global && (
          <Message negative>
            <Message.Header>Oops, something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field  error={!!errors.name}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name}/>}
        </Form.Field>

        <Button primary>Create</Button>
      </Form>
    );
  }
}

ServerForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ServerForm;
