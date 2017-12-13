import api from '../api';
import { MESSAGE_CREATED, SET_CHANNEL_MESSAGES } from '../types';

export function messageCreated(message) {
  return {
    type: MESSAGE_CREATED,
    message
  }
}

export function setChannelMessages(channelMessages) {
  return {
    type: SET_CHANNEL_MESSAGES,
    channelMessages
  }
}

export const createMessage = data => (dispatch) =>
  api.message.create(data).then(message => {
    dispatch(messageCreated(message));
  });

export const fetchChannelMessages = channelId => (dispatch) =>
  api.message.fetchChannelMessages(channelId).then(data => {
    dispatch(setChannelMessages(data));
  });
