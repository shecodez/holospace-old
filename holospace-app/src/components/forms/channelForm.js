import React from 'react';

class ChannelForm extends React.Component {
  state = {
    data: {
      name: '',
      topic: ''
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
    // TODO: don't allow curse words to be server name
    if (!data.name) errors.name = "Cannot be blank";
    // if (data.name.length > 50) errors.name = "Channel name too long";
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
        <div className="group" error={!!errors.name}>
          <input
            type="name"
            id="name"
            name="name"
            placeholder=" "
            value={data.name}
            onChange={this.onChange}
            required
          />
          <label>Name</label>
          {/* errors.name && <span>errors.name</span> */}
        </div>
        <div className="group" error={!!errors.topic}>
          <input
            type="topic"
            id="topic"
            name="topic"
            placeholder=" "
            value={data.topic}
            onChange={this.onChange}
          />
          <label>Name</label>
          {/* errors.topic && <span>errors.topic</span> */}
        </div>
      </form>
    );
  }
}

export default ChannelForm;
