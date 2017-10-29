import React, { Component } from 'react';

//components
import Message from './message';

class History extends Component {

  render() {
    const messages = this.props.history.map((message, i) => {
      return (
        <Message
          key={i}
          user_id={message.user_id}
          message={message.message} />
          //date={message.created_at} />
      );
    });

    return (
      <div className='chat-history'>
        <ul className='scroll-y'>
          {messages}
        </ul>
      </div>
    );
  }
}

export default History;
