import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// TODO: import icons for : no sound, mic, and VR
// [hear no evil], [speak no evil], [see no evil]


class User extends Component {
  truncate(text, n) {
    if (text.length > n)
      return text.substring(0, n) + '...';
    else
      return text;
  }
  render() {
    let user = this.props.user;

    return (
      <div className="user section">
        <div className='info'>
          <img src={user.avatar} alt="user"/>
          <h4>{this.truncate(user.username, 9)}<br />
          <span>{'#'+user.pin}</span></h4>
        </div>
        <div>
          <button><SimpleLineIcon name="earphones" /></button>
          <button><SimpleLineIcon name="microphone" /></button>
          <button><SimpleLineIcon name="eyeglass" /></button>
          <button><SimpleLineIcon name="settings" /></button>
        </div>
      </div>
    );
  }
}

export default User;
