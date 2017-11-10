import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

class Channel extends Component {

  constructor() {
    super();
    this.state = {
      selectedChannel: {}
    }
    this.setChannel = this.setChannel.bind(this);
  }

  setChannel () {
    this.setState({
      selectedChannel: this.props.channel
    }, function() {
      // console.log(this.state.selectedChannel);
      this.props.onSelect(this.state.selectedChannel);
    });
  }

  render() {
    const prepend = (this.props.channel.type === 'Text') ?
      "# " :
      <SimpleLineIcon name="arrow-right" />
    const currentChannel = this.props.isCurrentChannel ? " is-current-channel" : "";
    return (
      <li className={`channel${  currentChannel}`}>
        <button className="select-channel-btn" onClick={this.setChannel}>
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

export default Channel;
