import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

class ChannelLI extends Component {

  render() {
    const prepend = (this.props.channel.type === 'Text') ?
      "# " :
      <SimpleLineIcon name="arrow-right" />
    return (
      <li className="channel">
        <button className="toggle-channel-membs-btn">
          <span className="prepend">{ prepend }</span>
          {this.props.channel.name}
        </button>
        <a href="#">
          <SimpleLineIcon name="settings" />
        </a>
      </li>
    );
  }
}

export default ChannelLI;
