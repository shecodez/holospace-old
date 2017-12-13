import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { fetchChannel } from "../../actions/channels";

class CurrentChannel extends React.Component {

  componentDidMount() {
    if (this.props.match.params.channelId) {
      this.props.fetchChannel(this.props.match.params.channelId);
    }
  }

  render() {
    const { channel } = this.props;

    return (
      <div className="current-channel">
        <div>
          { channel && <h3 className="name">
            <span>{(channel.type === 'Text') ? '#' : ''}</span> {channel.name}
          </h3> }
          { channel && channel.topic &&
            <span className="topic">{channel.topic}</span>
          }
        </div>

        <Button.Group>
          <Button icon="bell outline" />
          <Button icon="search" />
          <Button icon="calendar plus" />
        </Button.Group>
      </div>
    );
  }
}

CurrentChannel.defaultProps = {
  channel: null
};

CurrentChannel.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired,
      channelId: PropTypes.string.isRequired
    })
  }).isRequired,
  channel: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    topic: PropTypes.string,
    type: PropTypes.string
  }),
  fetchChannel: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    channel: state.channels.find(item => item._id === props.match.params.channelId) ||
    null
  };
}

export default connect(mapStateToProps, { fetchChannel })(CurrentChannel);
