import api from '../api';
import { userLoggedIn } from "./auth";

export const register = data => (dispatch) =>
  api.user.register(data).then(user => {
    localStorage.holospaceJWT = user.token;
    dispatch(userLoggedIn(user));
  });
