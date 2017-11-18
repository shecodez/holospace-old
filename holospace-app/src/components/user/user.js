import React, { Component } from 'react';
import { Image } from "semantic-ui-react";

class User extends Component {
  truncate(text, n) {
    if (text.length > n)
      return `${text.substring(0, n)  }...`;
    return text;
  }
  render() {
    const user = this.props.user;

    return (
      <div className="user">
        <div className='info'>
          <Image avatar src={user.avatar} />
          <h4>{this.truncate(user.username, 9)}<br />
          <span>{`#${user.pin}`}</span></h4>
        </div>
      </div>
    );
  }
}

export default User;
