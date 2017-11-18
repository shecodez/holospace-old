import api from '../api';

export const joinServer = data => () =>
  api.membership.create(data);
