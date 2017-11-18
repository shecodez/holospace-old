import { combineReducers } from "redux";

import user from "./reducers/user";
import servers from "./reducers/servers";

export default combineReducers({
  user,
  servers
});
