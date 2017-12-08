import { SET_MEMBER_SERVERS, ADD_SERVER } from "../types";

export default function servers(state = [], action = {}) {
  switch (action.type) {
    case ADD_SERVER:
      return [
        ...state,
        action.server
      ];
    case SET_MEMBER_SERVERS:
      return action.memberServers;
    default:
      return state;
  }
}
