import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchServerChannels } from "../../actions/channels";

// Components
import Channel from './channel';
import AddChannel from './addChannel';
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';

class Channels extends React.Component {

  state = {
    serverId: this.props.match.params.serverId
  };

  componentDidMount() {
    this.props.fetchServerChannels(this.state.serverId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.serverId !== this.state.serverId)
      this.props.fetchServerChannels(nextProps.match.params.serverId);

    this.setState({ serverId: nextProps.match.params.serverId });
  }

  // setChannel = channel => this.setState({ channel });

  render() {
    // const { channels } = this.state;
    const { channels, match } = this.props;

    const textChannelList = [];
    const voiceChannelList = [];
    const vrChannelList = [];

    if (channels) {
      channels.forEach((channel) => {
        const isSelected = match.params.channelId === channel._id;

        switch(channel.type) {

          case "Voice":
            voiceChannelList.push(
              <Channel
                key={channel._id}
                serverId={match.params.serverId}
                channel={channel}
                onChannelSelect={this.setChannel}
                isSelected={isSelected}
              />
            );
            break;

          case "VR":
            vrChannelList.push(
              <Channel
                key={channel._id}
                serverId={match.params.serverId}
                channel={channel}
                onChannelSelect={this.setChannel}
                isSelected={isSelected}
              />
            );
            break;

          default:
            textChannelList.push(
              <Channel
                key={channel._id}
                serverId={match.params.serverId}
                channel={channel}
                onChannelSelect={this.setChannel}
                isSelected={isSelected}
              />
            );
        }
      });
    }

    return (
      <div className="channels section">
        <Tabs selected={0}>
          <Pane label="ALL">
            <AddChannel match={match} type ='Text' />
            {textChannelList}

            <AddChannel match={match} type ='Voice' />
            {voiceChannelList}

            <AddChannel match={match} type ='VR' />
            {vrChannelList}
          </Pane>

          <Pane label={<Icon name="browser" />}>
            <AddChannel match={match} type='Text' />
            {textChannelList}
          </Pane>

          <Pane label={<Icon name="microphone" />}>
            <AddChannel match={match} type='Voice' />
            {voiceChannelList}
          </Pane>

          <Pane label={<Icon name="game" />}>
            <AddChannel match={match} type='VR' />
            {vrChannelList}
          </Pane>
        </Tabs>
      </div>
    );
  }
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    channel: PropTypes.object
  })).isRequired,
  fetchServerChannels: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    channels: state.channels
  }
}

export default connect(mapStateToProps, { fetchServerChannels })(Channels);
