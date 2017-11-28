import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import moment from "moment";
/* formatDate = (dateStr) => {
  const msgDate = new Date(dateStr);
  return dateStr `${msgDate.toLocaleDateString()  } at ${  msgDate.toLocaleTimeString()}`;
}; */

const Message = ({message}) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content>
      <Comment.Author as='a'>{message.user.username}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(message.created_at).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text>{message.body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.number.isRequired
  }).isRequired
};

export default Message;
