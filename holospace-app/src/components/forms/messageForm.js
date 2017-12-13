import React from 'react';
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

// components
import InlineError from "../alerts/inlineError";

class MessageForm extends React.Component {
  state = {
    data: {
      body: this.props.message ? this.props.message.body : ''
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
    this.setState({ data: { body: '' }});
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
          <input
            type="text"
            id="body"
            name="body"
            placeholder=" "
            value={data.body}
            onChange={this.onChange}
            required
          />
          <label htmlFor="body">{this.props.message_label}</label>
          <button className="emoji-btn">EMO</button>
          {errors.topic && <InlineError text={errors.topic}/>}
        </div>
      </form>
    );
  }
}

MessageForm.defaultProps = {
  message: null
};

MessageForm.propTypes = {
  submit: PropTypes.func.isRequired,
  message_label: PropTypes.string.isRequired,
  message: PropTypes.shape({
    body: PropTypes.string
  })
};

export default MessageForm;
