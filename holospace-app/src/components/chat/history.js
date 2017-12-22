import React from "react";
import PropTypes from "prop-types";
import { Comment, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchChannelMessages } from "../../actions/messages";

// components
import Message from "./message";

// TODO: make message blocks

class History extends React.Component {

  state = {
    channelId: this.props.match.params.channelId || null,
    loading: false
  };

  componentDidMount() {
    if (this.props.match.params.channelId) {
      this.props.fetchChannelMessages(this.props.match.params.channelId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.channelId !== this.state.channelId)
      this.props.fetchChannelMessages(nextProps.match.params.channelId);

    this.setState({ channelId: nextProps.match.params.channelId });

    // Smart scrolling - when the user scrolls up we don't want auto scroll to bottom
    /* const container = this.messageContainer;
    if (container.scrollHeight - (container.scrollTop + container.offsetHeight) >= 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    } */
  }

  componentDidUpdate() {
    if (this.scrolled) {
      return;
    }
    // There is a new message in the state, scroll to bottom of list
    const container = this.messageContainer;
    container.scrollTop = container.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    const history = messages.map(message => (
      <Message key={message._id} message={message} />
    ));

    return (
      <div className="chat-history"
        ref={(element) => { this.messageContainer = element; }}>

        {messages.length === 0
          ? <p>
              No messages
            </p>
          : <Comment.Group size="large">
              <Header as="h3" inverted dividing>
                In the very beginning...
              </Header>
              {history}
            </Comment.Group>}
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
      channelId: PropTypes.string
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

/*
{ loading &&
  <Dimmer active>
    <Loader content='Loading' />
  </Dimmer>
}
 */
