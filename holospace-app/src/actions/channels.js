import api from '../api';

export const createServer = data => () =>
  api.channel.create(data);
