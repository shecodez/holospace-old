import React from 'react';
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

// components
import InlineError from "../alerts/inlineError";

class MessageForm extends React.Component {
  state = {
    data: {
      body: ''
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
      /* this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        ); */
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.body) errors.body = "Cannot be blank";
    return errors;
  }

  render() {
    const { data, errors } = this.state;

    return (
      <form className="custom-form" onSubmit={this.onSubmit}>
        { errors.global && (
          <Message negative>
            <Message.Header>Oops, something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <div className="group">
          <input control='input'
            type="text"
            id="body"
            name="body"
            placeholder=" "
            value={data.body}
            onChange={this.onChange}
            required
          />
          <label htmlFor="body">{this.props.message_label}</label>
          {errors.topic && <InlineError text={errors.topic}/>}
        </div>
      </form>
    );
  }
}

MessageForm.propTypes = {
  // submit: PropTypes.func.isRequired,
  message_label: PropTypes.string.isRequired
};

export default MessageForm;
