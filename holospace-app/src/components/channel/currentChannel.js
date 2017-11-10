import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

class CurrentChannel extends Component {
  render() {
    const prepend = (this.props.currentChannel.type === 'Text') ? '# ' : '';
    return (

      <div className="current-channel section">
        <div className="info">
          <h3 className="channel-name">
            <span>{prepend}</span>
            {this.props.currentChannel.name}
          </h3>
          { this.props.currentChannel.topic &&
            <span className="topic">{this.props.currentChannel.topic}</span>
          }
        </div>
        <div className="a-links">
          <a><SimpleLineIcon name="bell" /></a>
          <a><SimpleLineIcon name="magnifier" /></a>
          <a><SimpleLineIcon name="event" /></a>
        </div>
      </div>
    );
  }
}

export default CurrentChannel;
