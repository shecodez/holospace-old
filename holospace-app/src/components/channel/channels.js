import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Components
import ChannelLI from './channelLI';
import AddChannel from './addChannel';
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';

class Channels extends Component {

  onAddChannel(channel) {
    //console.log(channel);
    let channels = this.props.channels;
    channels.push(channel);
    this.setState({channels:channels});
  }

  render() {
    /*let channelList;
    channelList = this.props.channel.map(channel => {
      console.log(channel);
      //return( <ChannelLI key={channel.id} channel={channel} />);
    });*/

    /*textChannelList = this.props.channels
      .filter(c => c.type === 'Text')
      .map(c => {
        return( <ChannelLI key={c.id} channel={c} /> );
      });

    voiceChannelList = this.props.channels
      .filter(c => c.type === 'Voice')
      .map(c => {
        return( <ChannelLI key={c.id} channel={c} /> );
      });

    vrChannelList = this.props.channels
      .filter(c => c.type === 'VR')
      .map(c => {
        return( <ChannelLI key={c.id} channel={c} /> );
      });
    //Note: I don't think the above is efficient or DRY */

    const textChannelList = [];
    const voiceChannelList = [];
    const vrChannelList = [];
    if (this.props.channels) {
      this.props.channels.forEach((channel) => {
        switch(channel.type) {
          case "Text":
            textChannelList.push(<ChannelLI key={channel.id} channel={channel} />);
            break;
          case "Voice":
            voiceChannelList.push(<ChannelLI key={channel.id} channel={channel} />);
            break;
          case "VR":
            vrChannelList.push(<ChannelLI key={channel.id} channel={channel} />);
            break;
          default:
            textChannelList.push(<ChannelLI key={channel.id} channel={channel} />);
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
