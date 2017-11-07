import React, { Component } from 'react';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        message_body: ''
      }
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit(e) {
    e.preventDefault();
    this.props.onSend(this.state.data.message_body);
    this.setState({ data: { message_body: '' }});
  }

  render() {
    const { data } = this.state;

    return (
      <div className='chatbox'>
        {/*<ChatInputForm onSend=onSubmit(this) message_label={'Message to #' + this.props.channel} />*/}
        <form className='form' onSubmit={this.onSubmit}>
          <div className='group'>
            <input
              type='text'
              id='message_body'
              name='message_body'
              placeholder=' '
              value={data.message_body}
              onChange={this.onChange}
              required />
            <label>{'Message #' + this.props.channel.name} </label>
            <button type='submit'>SEND</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Chatbox;
