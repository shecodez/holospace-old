import React from 'react';

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
      this.props.submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = (data) => {
    const errors = {};
    // TODO: blank out curse words in non 18+ channels
    if (!data.body) errors.body = "Cannot be blank";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <form className="form server-form" onSubmit={this.onSubmit} loading={loading}>
        { errors.global &&
          <div className="error-message">
            <header>Something went wrong</header>
            <p className="message-body">{errors.global}</p>
          </div>
        }
        <div className="group" error={!!errors.body}>
          <input
            type="body"
            id="body"
            name="body"
            placeholder=" "
            value={data.body}
            onChange={this.onChange}
            required
          />
          <label>{this.props.message_label}</label>
          {/*errors.body && <span>errors.body</span>*/}
        </div>
      </form>
    );
  }
}

export default MessageForm;
