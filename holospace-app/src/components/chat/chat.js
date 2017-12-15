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
