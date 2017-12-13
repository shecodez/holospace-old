import api from '../api';
import { CHANNEL_CREATED, CHANNEL_FETCHED, CHANNEL_UPDATED, SET_SERVER_CHANNELS } from '../types';

export function channelCreated(channel) {
  return {
    type: CHANNEL_CREATED,
    channel
  }
}

export function channelFetched(channel) {
  return {
    type: CHANNEL_FETCHED,
    channel
  }
}

export function channelUpdated(channel) {
  return {
    type: CHANNEL_UPDATED,
    channel
  }
}

export function setServerChannels(serverChannels) {
  return {
    type: SET_SERVER_CHANNELS,
    serverChannels
  }
}

export const createChannel = data => (dispatch) =>
  api.channel.create(data).then(channel => {
    dispatch(channelCreated(channel));
  });

export const fetchChannel = byId => (dispatch) =>
  api.channel.getOne(byId).then(channel => {
    dispatch(channelFetched(channel));
  });

export const updateChannel = data => (dispatch) =>
  api.channel.update(data).then(channel => {
    dispatch(channelUpdated(channel));
  });

export const fetchServerChannels = serverId => (dispatch) =>
  api.channel.fetchServerChannels(serverId).then(data => {
    dispatch(setServerChannels(data));
  });
