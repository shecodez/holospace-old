import api from '../api';
import { ADD_SERVER } from "../types";

export function addServer(server) {
  return {
    type: ADD_SERVER,
    server
  }
}

export const createServer = data => (dispatch) =>
  api.server.create(data).then(server => {
    dispatch(addServer(server));
  });
