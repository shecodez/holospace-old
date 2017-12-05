import api from '../api';
import { SET_MEMBER_SERVERS } from '../types';

export function setMemberServers(memberServers) {
  return {
    type: SET_MEMBER_SERVERS,
    memberServers
  }
}

/* export const joinServer = data => () =>
  api.membership.create(data); */

export const fetchMemberServers = () => (dispatch) =>
  api.membership.fetchMemberServers().then(data => {
    dispatch(setMemberServers(data.data.servers));
  });

export const fetchServerMembers = serverId => () =>
  api.membership.fetchServerMembers(serverId);
