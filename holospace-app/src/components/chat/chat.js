import React, { Component } from 'react';
import uuid from 'uuid';
// components
import History from './history';
import Chatbox from './chatbox';

class Chat extends Component {
  // avatar = http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png
  constructor() {
    super();
    this.state = {
      history: []
    };
    this.sendHandler = this.sendHandler.bind(this);
    /*
    // Connect to the server
    api_url = '~/servers/:id/channels/:id';
    this.socket = io(api_url).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
    */
  }

  componentWillMount() {
    this.setState({
      history: [
        {
          id: 1,
          body: 'Hi there! My name is Nicole J. Nobles and I\'m a designer and developer from Georgia (contact details img goes here)',
          direct: false,
          user:
            {
              id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 1,
          created_at: new Date().valueOf()
        },
        {
          id: 2,
          body: 'Education...',
          direct: false,
          user:
            {
              id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 2,
          created_at: new Date().valueOf()
        },
        {
          id: 3,
          body: 'Experience...',
          direct: false,
          user:
            {
              id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 3,
          created_at: new Date().valueOf()
        }
      ]
    });
  }

  sendHandler(message) {
    const msgObj = {
      id: uuid.v4(),
      body: message,
      user: this.props.user,
      channel_id: this.props.currentChannel.id,
      created_at: new Date().valueOf()
    };

    // Emit message to the servers
    // this.socket.emit('client:message', msgObj);
    this.addMessage(msgObj);
  }

  addMessage(message) {
    // console.log(message);
    const messages = this.state.history;
    messages.push(message);
    this.setState({history:messages});
  }

  filteredMessages() {
    return this.state.history.filter(({channel_id}) => channel_id === this.props.currentChannel.id);
  }

  render() {
    return (
      <div className="chat section">
        <History history={this.filteredMessages()} />
        <Chatbox onSend={this.sendHandler} channel={this.props.currentChannel} />
      </div>
    );
  }
}

/* Chat.defaultProps = {
  history: []
};

Chat.propTypes = {
  history: React.PropTypes.array.isRequired
}; */

export default Chat;
