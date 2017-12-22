import { SET_CHANNEL_USERS, USER_CONNECTED, USER_DISCONNECTED } from "../types";

export default function users(state = [], action = {}) {
  switch (action.type) {
    case SET_CHANNEL_USERS:
      return action.users;

    case USER_CONNECTED:
      return action.user;

    case USER_DISCONNECTED:
      return action.user;

    default:
      return state;
  }
}
