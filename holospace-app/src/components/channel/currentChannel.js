import React, { Component } from 'react';

class CurrentChannel extends Component {
  render() {
    var prepend = (this.props.currentChannel.type === 'Text') ? '#' : '';
    return (

      <div className="current-channel section">
        <h3 className="channel-name">
          <span>{prepend}</span>
          {this.props.currentChannel.name}
        </h3>
        { this.props.currentChannel.topic &&
          <span className="topic">{this.props.currentChannel.topic}</span>
        }
      </div>
    );
  }
}

export default CurrentChannel;
