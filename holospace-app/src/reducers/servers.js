import { SET_MEMBER_SERVERS } from "../types";

export default function servers(state = [], action = {}) {
  switch (action.type) {
    case SET_MEMBER_SERVERS:
      return action.memberServers;
    default:
      return state;
  }
}
