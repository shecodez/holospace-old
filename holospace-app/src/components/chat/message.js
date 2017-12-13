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
    <Comment.Avatar src={message.author_id.avatar} />
    <Comment.Content>
      <Comment.Author as='a'>{message.author_id.username}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(message.createdAt).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text>{message.body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

Message.propTypes = {
  message: PropTypes.shape({
    author_id: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};

export default Message;
