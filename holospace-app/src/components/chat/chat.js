import React from 'react';
import PropTypes from "prop-types";

// components
import History from './history';
import Chatbox from './chatbox';

class Chat extends React.Component {
  state = {
    history: [],
    channel: {
      _id: "5a0f4bcb1c35354aa41d95bf",
      name: "General",
      type: "Text"
    }
  };

  componentWillMount() {
    this.setState({
      history: [
        {
          _id: 1,
          body: 'Hi there! My name is Nicole J. Nobles and I\'m a designer and developer from Georgia (contact details img goes here)',
          direct: false,
          user:
            {
              _id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 1,
          created_at: new Date().valueOf()
        },
        {
          _id: 2,
          body: 'Education...',
          direct: false,
          user:
            {
              _id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 2,
          created_at: new Date().valueOf()
        },
        {
          _id: 3,
          body: 'Experience...',
          direct: false,
          user:
            {
              _id: 2,
              username: 'shecodez',
              avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png'
            },
          channel_id: 3,
          created_at: new Date().valueOf()
        }
      ]
    });
  }


  render() {
    const { match } = this.props;

    return (
      <div className="chat">
        <History match={match} />
        <Chatbox match={match} />
      </div>
    );
  }
}

Chat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired
    })
  }).isRequired
};

export default Chat;
