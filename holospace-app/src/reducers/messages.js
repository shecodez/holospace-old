import { SET_CHANNEL_MESSAGES, MESSAGE_CREATED } from "../types";

export default function messages(state = [], action = {}) {
  switch (action.type) {
    case SET_CHANNEL_MESSAGES:
      return action.channelMessages;

    case MESSAGE_CREATED:
      return [...state, action.message];

    /* case MESSAGE_UPDATED:
      return state.map(item => {
        if (item._id === action.channel._id) return action.channel;
        return item;
      }); */

    default:
      return state;
  }
}
