import { combineReducers } from "redux";

import user from "./reducers/user";
import servers from "./reducers/servers";
import channels from "./reducers/channels";

export default combineReducers({
  user,
  servers,
  channels
});
