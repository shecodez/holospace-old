import React from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";

// Components
import Channel from './channel';
import AddChannel from './addChannel';
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';

class Channels extends React.Component {

  state = {
    channels: [],
    channel: null
  };

  componentDidMount() {
    axios.get("/api/channels").then(res => {
      this.setState({ channels: res.data });
    });
  }

  setChannel = channel => this.setState({ channel });

  render() {
    const { channels } = this.state;

    const textChannelList = [];
    const voiceChannelList = [];
    const vrChannelList = [];

    if (channels) {
      channels.forEach((channel) => {
        const isSelected = (this.state.channel || channels[0])._id === channel._id;

        switch(channel.type) {
          case "Text":
            textChannelList.push(
              <Channel
                key={channel._id}
                channel={channel}
                onChannelSelect={this.setChannel}
                isSelected={isSelected}
              />
            );
            break;

          case "Voice":
            voiceChannelList.push(
              <Channel
                key={channel._id}
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
            <AddChannel type ='Text' />
            {textChannelList}

            <AddChannel type ='Voice' />
            {voiceChannelList}

            <AddChannel type ='VR' />
            {vrChannelList}
          </Pane>

          <Pane label={<Icon name="browser" />}>
            <AddChannel type='Text' />
            {textChannelList}
          </Pane>

          <Pane label={<Icon name="microphone" />}>
            <AddChannel type='Voice' />
            {voiceChannelList}
          </Pane>

          <Pane label={<Icon name="game" />}>
            <AddChannel type='VR' />
            {vrChannelList}
          </Pane>
        </Tabs>
      </div>
    );
  }
}

export default Channels;
