import React from "react";
import PropTypes from "prop-types";
import { Comment, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchChannelMessages } from "../../actions/messages";

// components
import Message from "./message";

/* TODO: make message blocks
for (i=0; i < messages.length; i++) {
  let msgBlock = message[i].body
  if (messages.length > 1) {
    if (message[i].author === message[i-1].author)
      msgBlock.push(message[i].body+"\n");
  } else {
    <Message key={message[i]._id} message={msgBlock} />
    msgBlock = "";
  }
} */

class History extends React.Component {

  state = {
    channelId: this.props.match.params.channelId
  };

  componentDidMount() {
    this.props.fetchChannelMessages(this.props.match.params.channelId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.channelId !== this.state.channelId)
      this.props.fetchChannelMessages(nextProps.match.params.channelId);

    this.setState({ channelId: nextProps.match.params.channelId });
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('message-list');
    if (objDiv)
      objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const { messages } = this.props;
    const history = messages.map(message => (
      <Message key={message._id} message={message} />
    ));

    return (
      <div className="chat-history">
        {messages.length === 0 ? (
          <p>No messages in this channel yet</p>
        ) : (
          <Comment.Group size="large">
            <Header as="h3" inverted dividing>
              In the very beginning...
            </Header>
            <div id='message-list'>
              {history}
            </div>
          </Comment.Group>
        )}
      </div>
    );
  }
}

History.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.object
    })
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchChannelMessages: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, { fetchChannelMessages })(History);
