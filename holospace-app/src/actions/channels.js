import api from '../api';

export const createChannel = data => () =>
  api.channel.create(data);
