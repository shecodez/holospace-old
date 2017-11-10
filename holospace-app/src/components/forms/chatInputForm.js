import React, { Component } from 'react';

class ChatInputForm extends Component {
  state = {
    data: {
      message_body: ''
    }
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    this.props.onSend(this.state.data);
    this.setState({ data: { message_body: '' }});
  };

  render() {
    const { data } = this.state;

    return (
      <form className="form chatinput-form" onSubmit={this.onSubmit}>
        <div className="group">
          <input
            type="text"
            id="message_body"
            name="message_body"
            placeholder=" "
            value={data.message_body}
            onChange={this.onChange}
            required
          />
          <label>{this.props.message_label}</label>
          {/* errors.message_body && <span>errors.message_body</span> */}
          <button type='submit'>SEND</button>
        </div>
      </form>
    );
  }
}

/*
ChatInputForm.defaultProps = {
  message_label: ''
};

ChatInputForm.propTypes = {
  message_label: React.PropTypes.string.isRequired
  onSend: React.PropTypes.func.isRequired
}; */

export default ChatInputForm;
