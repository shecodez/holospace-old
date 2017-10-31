import React, { Component } from 'react';

// Components
import ChannelLI from './channelLI';
import AddChannel from './addChannel';

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
        <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Text' />
        {textChannelList}

        <AddChannel addChannel={this.onAddChannel.bind(this)} type ='Voice' />
        {voiceChannelList}

        <AddChannel addChannel={this.onAddChannel.bind(this)} type ='VR' />
        {vrChannelList}
      </div>
    );
  }
}

export default Channels;
