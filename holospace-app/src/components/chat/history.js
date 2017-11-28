import React, { Component } from 'react';
import { Comment, Header } from "semantic-ui-react";

// components
import Message from './message';

class History extends Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementsByClassName('comments');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.props.history.map((message) => {
      return (
        <Message key={message._id} message={message} />
      );
    });

    return (
      <div className='chat-history'>
        <Comment.Group size='large'>
          <Header as='h3' dividing>In the very beginning...</Header>
          {messages}
        </Comment.Group>
      </div>
    );
  }
}

export default History;
