import { combineReducers } from "redux";

import user from "./reducers/user";
import servers from "./reducers/servers";
import channels from "./reducers/channels";
import memberships from "./reducers/memberships";

export default combineReducers({
  user,
  servers,
  channels,
  memberships
});
