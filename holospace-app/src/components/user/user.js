import React, { Component } from 'react';


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
      <div className="user">
        <div className='info'>
          <img src={user.avatar} alt="user"/>
          <h4>{this.truncate(user.username, 9)}<br />
          <span>{'#'+user.pin}</span></h4>
        </div>
      </div>
    );
  }
}

export default User;
