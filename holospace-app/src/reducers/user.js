import { Vector3, Euler } from "three";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";

const positionScale = 0.5;
const positionSpeed = 0.001;
const positionOffset = 0.2;

const rotationSpeed = 0.002;
const rotationScale = 0.03;

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};

    default:
      return state;
  }
}

export function movement(oldState, time) {
  // Merge the old state with the updated properties
  return {
    ...oldState,
    userPosition: new Vector3( 0, 0, positionScale * Math.sin(time * positionSpeed) + positionOffset ),
    userRotation: new Euler( 0, 0, rotationScale * Math.sin(time * rotationSpeed)
    )
  };
}
