import { createSelector } from "reselect";

export default function channels(state = {}, action ={}) {
  switch(action.type) {
    default:
      return state;
  }
}

// SELECTORS

export const channelsSelector = state => state.channels;

export const allServersSelector = createSelector(channelsSelector, channelsHash =>
  Object.values(channelsHash)
);
