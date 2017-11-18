import { createSelector } from "reselect";

export default function servers(state = {}, action ={}) {
  switch(action.type) {
    default:
      return state;
  }
}

// SELECTORS

export const serversSelector = state => state.servers;

export const allServersSelector = createSelector(serversSelector, serversHash =>
  Object.values(serversHash)
);
