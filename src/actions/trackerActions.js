import * as types from "../constants/actionTypes";

export const addToTracker = char => ({
  type: types.ADD_TO_TRACKER,
  char
});

export const removeFromTracker = key => ({
  type: types.REMOVE_FROM_TRACKER,
  key
})

