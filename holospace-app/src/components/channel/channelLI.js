import React, { Component } from 'react';

class ChannelLI extends Component {

  render() {
    const prepend = (this.props.channel.type === 'Text') ? <span># </span> : <span>&or; </span>
    return (
      <li className="channel">
        <a href="#">
          { prepend }
          {this.props.channel.name}
        </a>
        <span>(gear)</span>
      </li>
    );
  }
}

export default ChannelLI;
