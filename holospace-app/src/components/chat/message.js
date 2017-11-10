import React from 'react';
// import './chat.css';

const Message = ({username, body, userAvatar, date}) => (
  <div className="message">
    <img className="user-avatar" src={userAvatar} alt='Avatar' />
    <div>
      <div className="message-from-at">
        <h3>{username}</h3>
        <span>{date}</span>
      </div>
      <div className="message-body">
        {body}
      </div>
    </div>
  </div>
);

export default Message;
