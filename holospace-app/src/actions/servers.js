import api from '../api';

export const createServer = data => () =>
  api.server.create(data);
