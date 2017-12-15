import React from 'react';
import PropTypes from "prop-types";
import { Button, Message } from "semantic-ui-react";

// components
import InlineError from "../alerts/inlineError";

class SearchForm extends React.Component {
  state = {
    data: {
      query: ''
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
    this.setState({ data: { query: '' }});
  };

  validate = (data) => {
    const errors = {};
    if (!data.query) errors.query = "Cannot be blank";
    return errors;
  }

  render() {
    const { data, errors } = this.state;

    return (
      <form className="custom-form search-form" onSubmit={this.onSubmit}>
        { errors.global && (
          <Message negative>
            <Message.Header>Oops, something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <div className="group">
          <input
            type="search"
            id="query"
            name="query"
            placeholder="Search..."
            value={data.query}
            onChange={this.onChange}
            required
          />
          <label htmlFor="query" />
          <Button.Group>
            <Button icon="microphone" />
            <Button icon="search" type='submit' />
          </Button.Group>
          {errors.topic && <InlineError text={errors.topic}/>}
        </div>
      </form>
    );
  }
}


SearchForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SearchForm;
