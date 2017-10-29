import React, { Component } from 'react';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      chatInput: '',
      width: 0
    };

    // React ES6 does not bind 'this' to event handlers by default
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e)  {
    this.setState({ chatInput: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); // prevent page refresh
    // onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
    this.setState({ chatInput: '' }); // clear
  }

  render() {
    return (
      <div className='chatbox'>
        <form className='form' onSubmit={this.onSubmit}>
          <div className='group'>
            <textarea type='text'
              rows='1'
              onChange={this.onTextChange}
              value={this.state.chatInput}
              placeholder=' '
              required />
            <label>{'Message to #' + this.props.channel} </label>
            <button type='submit'>SEND</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Chatbox;
