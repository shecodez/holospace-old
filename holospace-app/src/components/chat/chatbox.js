import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMessage } from "../../actions/messages";
import { fetchChannel } from "../../actions/channels";

// components
import MessageForm from "../forms/messageForm";

class Chatbox extends React.Component {

  componentDidMount() {
    if (this.props.match.params.channelId) {
      this.props.fetchChannel(this.props.match.params.channelId);
    }
  }

  submit = data => {
    // console.log(this.addChannelIdToMessage(data));
    this.props.createMessage(this.addChannelIdToMessage(data));
  }

  addChannelIdToMessage = (data) => {
    const message = {
      body: data.body,
      channel_id: this.props.channel._id
    }
    return message;
  }

  render() {
    const { channel } = this.props;

    return (
      <div className='chatbox'>
        { channel && <MessageForm submit={this.submit} message_label={`Message #${channel.name}`} />}
      </div>
    );
  }
}

Chatbox.defaultProps = {
  channel: null
};

Chatbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired
    })
  }).isRequired,
  channel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  fetchChannel: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    channel: state.channels.find(item => item._id === props.match.params.channelId)
  };
}

export default connect(mapStateToProps, { fetchChannel, createMessage })(Chatbox);
