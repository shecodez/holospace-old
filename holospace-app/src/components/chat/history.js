import React, { Component } from 'react';

// components
import Message from './message';

class History extends Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('message-list');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.props.history.map((message, i) => {
      const msgDate = new Date(message.created_at);
      const dateStr = `${msgDate.toLocaleDateString()  } at ${  msgDate.toLocaleTimeString()}`;
      return (
        <Message
          key={message.id}
          username={message.user.username}
          userAvatar={message.user.avatar}
          body={message.body}
          date={dateStr} />
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
