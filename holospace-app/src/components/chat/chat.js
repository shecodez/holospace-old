import React from 'react';
import PropTypes from "prop-types";

// components
import History from './history';
import Chatbox from './chatbox';


class Chat extends React.Component {
  state: {
    users: []
  };

  render() {
    const { match, direct } = this.props;

    return (
      <div className="chat">
        <History match={match} direct={direct} />
        <Chatbox match={match} direct={direct} />
      </div>
    );
  }
}

Chat.defaultProps = {
  direct: false
};

Chat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string
    })
  }).isRequired,
  direct: PropTypes.bool
};

export default Chat;
