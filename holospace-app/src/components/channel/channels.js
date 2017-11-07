import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Components
import Channel from './channel';
import AddChannel from './addChannel';
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';

class Channels extends Component {

  onAddChannel(channel) {
    //console.log(channel);
    let channels = this.props.channels;
    channels.push(channel);
    this.setState({channels: channels});
  }

  setChannel(channel) {
    //console.log(channel);
    this.props.setCurrentChannel(channel);
  }

  render() {
    const textChannelList = [];
    const voiceChannelList = [];
    const vrChannelList = [];

    if (this.props.channels) {
      this.props.channels.forEach((channel) => {
        const isSelected = this.props.currentChannelId === channel.id;

        switch(channel.type) {
          case "Text":
            textChannelList.push(<Channel key={channel.id} channel={channel} onSelect={this.setChannel.bind(this)} isCurrentChannel={isSelected} />);
            break;
          case "Voice":
            voiceChannelList.push(<Channel key={channel.id} channel={channel} onSelect={this.setChannel.bind(this)} isCurrentChannel={isSelected} />);
            break;
          case "VR":
            vrChannelList.push(<Channel key={channel.id} channel={channel} onSelect={this.setChannel.bind(this)} isCurrentChannel={isSelected} />);
            break;
          default:
            textChannelList.push(<Channel key={channel.id} channel={channel} onSelect={this.setChannel.bind(this)} isCurrentChannel={isSelected} />);
        }
      });
    }

    return (
      <div className="channels section">
        <Tabs selected={0}>
          <Pane label="ALL">
            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Text' />
            {textChannelList}

            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Voice' />
            {voiceChannelList}

            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='VR' />
            {vrChannelList}
          </Pane>

          <Pane label={<SimpleLineIcon name="speech" />}>
            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Text' />
            {textChannelList}
          </Pane>

          <Pane label={<SimpleLineIcon name="microphone" />}>
            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Voice' />
            {voiceChannelList}
          </Pane>

          <Pane label={<SimpleLineIcon name="eyeglass" />}>
            <AddChannel addChannel={this.onAddChannel.bind(this)} type ='VR' />
            {vrChannelList}
          </Pane>
        </Tabs>
      </div>
    );
  }
}

export default Channels;
