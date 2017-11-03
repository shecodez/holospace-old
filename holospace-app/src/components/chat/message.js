import React, { Component } from 'react';

class Message extends Component {
  render() {

    return (
      <div className='message-block'>
        <img className='avatar' src='http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png' alt='icon'/>

        <div className='sender'>
          <div className="name">
            <h4>{this.props.user.username}</h4>
          </div>
          <div className="msg">
            {this.props.message}
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
