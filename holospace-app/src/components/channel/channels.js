import React from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import { Icon, Accordion, List, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchServerChannels } from "../../actions/channels";

// Components
import Channel from './channel';
import AddChannel from './addChannel';
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';
import InlineSearchForm from '../forms/inlineSearchForm';

class Channels extends React.Component {

  state = {
    serverId: this.props.match.params.serverId,
    activeIndex: 0,
    connections: {}
  };

  componentDidMount() {
    this.socket = io();

    if (this.props.direct) {
      // this.props.fetchDirectChannels(this.state.userId);
    } else {
      this.props.fetchServerChannels(this.state.serverId);
    }

    this.socket.on('connections:update', this.updateChannelUsers);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.direct) {
      if (nextProps.match.params.serverId !== this.state.serverId)
        this.props.fetchServerChannels(nextProps.match.params.serverId);

      this.setState({ serverId: nextProps.match.params.serverId });
    }
  }

  setChannel = channel => {
    this.socket.emit('channel:switch', channel._id);

    // this.socket.on('connections:update', this.updateChannelUsers);
  };

  updateChannelUsers = (data) => {
    // console.log(data);
    this.setState({ connections: data });
  }

  submit = data => {
    console.log(`query: ${data}`);
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  createUserslist = (users) => {
    if (users) {
      return users.map((user) =>
        <List.Item key={user.username}>
          <Image avatar src={user.avatar} />
          <List.Content>
          <List.Header>{user.username.slice(0, -5)}</List.Header>
          </List.Content>
        </List.Item>
      );
    }
    return null;
  };

  render() {
    const { activeIndex, connections } = this.state;
    const { channels, match, direct } = this.props;

    const textChannelList = [];
    const voiceChannelList = [];
    const vrChannelList = [];

    if (channels) {
      channels.forEach((channel, i) => {
        const isSelected = match.params.channelId === channel._id;

        switch(channel.type) {

          case "Voice":
            voiceChannelList.push(
              <Accordion inverted key={channel._id}>
                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  <Channel
                    socket={this.socket}
                    match={match}
                    serverId={match.params.serverId}
                    channel={channel}
                    onChannelSelect={this.setChannel}
                    isSelected={isSelected}
                  />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  {connections[channel._id] &&
                    <List className="channel-users-list" inverted size='mini' verticalAlign='middle'>{this.createUserslist(connections[channel._id])}</List>}
                </Accordion.Content>
              </Accordion>
            );
            break;

          case "VR":
            vrChannelList.push(
              <Accordion inverted key={channel._id}>
                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  <Channel
                    socket={this.socket}
                    match={match}
                    serverId={match.params.serverId}
                    channel={channel}
                    onChannelSelect={this.setChannel}
                    isSelected={isSelected}
                  />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  {connections[channel._id] &&
                    <List className="channel-users-list" inverted size='mini' verticalAlign='middle'>{this.createUserslist(connections[channel._id])}</List>}
                </Accordion.Content>
              </Accordion>
            );
            break;

          default:
            textChannelList.push(
              <Channel
                socket={this.socket}
                match={match}
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
        { direct ?
          <div className="direct-channels">
            <InlineSearchForm submit={this.submit} />
            <AddChannel match={match} type='Text' direct />
            {textChannelList}
          </div> :
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
        }
      </div>
    );
  }
}

Channels.defaultProps = {
  direct: false
};

Channels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    channel: PropTypes.object
  })).isRequired,
  fetchServerChannels: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
      channelId: PropTypes.string
    })
  }).isRequired,
  direct: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    channels: state.channels
  }
}

export default connect(mapStateToProps, { fetchServerChannels })(Channels);
