import React, { Component } from 'react';

//components
import Message from './message';

class History extends Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('message-list');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.props.history.map((message, i) => {
      return (
        <Message
          key={i}
          user={message.user}
          message={message.message} />
          //date={message.created_at} />
      );
    });

    return (
      <div className='chat-history'>
        <ul id='message-list' className='scroll-y'>
          {messages}
        </ul>
      </div>
    );
  }
}

export default History;
